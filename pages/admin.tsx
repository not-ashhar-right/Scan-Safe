import { FormEvent, useEffect, useState } from 'react';

interface QRCodeRecord {
  id: string;
  batchId: string;
  productId?: string;
  createdAt: number;
  scannedCount: number;
  states: {
    manufactured: number | null;
    distributed: number | null;
    retailed: number | null;
    owner: null | { name: string; ownerId?: string; ts: number };
  };
}

interface ProductSummary {
  id: string;
  name: string;
  sku: string;
}

interface ScanRecord {
  id: string;
  qrId: string;
  role: string;
  actorId: string;
  actorName: string;
  timestamp: number;
  location?: any;
  isDuplicate: boolean;
  anomalyScore?: number;
  txHash?: string;
}

export default function AdminPage() {
  const [qrs, setQrs] = useState<QRCodeRecord[]>([]);
  const [products, setProducts] = useState<ProductSummary[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedQrId, setSelectedQrId] = useState<string | null>(null);
  const [scans, setScans] = useState<ScanRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [productName, setProductName] = useState('');
  const [productSku, setProductSku] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productError, setProductError] = useState('');
  const [productSuccess, setProductSuccess] = useState('');
  const [productSaving, setProductSaving] = useState(false);

  useEffect(() => {
    fetch('/api/qrs')
      .then((r) => r.json())
      .then((data: QRCodeRecord[]) => setQrs(data))
      .catch(() => {
        // ignore
      });
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((data: ProductSummary[]) => setProducts(data))
      .catch(() => {
        // ignore
      });
  }, []);

  useEffect(() => {
    if (!selectedProductId && products.length > 0 && qrs.length > 0) {
      const withQr = products.find((p) => qrs.some((qr) => qr.productId === p.id));
      setSelectedProductId((withQr || products[0]).id);
    }
  }, [products, qrs, selectedProductId]);

  const loadScans = async (qrId: string) => {
    setSelectedQrId(qrId);
    setLoading(true);
    try {
      const res = await fetch(`/api/scans/${qrId}`);
      const data = (await res.json()) as ScanRecord[];
      setScans(data);
    } catch {
      setScans([]);
    } finally {
      setLoading(false);
    }
  };

  const hasDuplicate = (qrId: string) =>
    scans.some((s) => s.qrId === qrId && s.isDuplicate);

  const anomalyScoreFor = (qrId: string) => {
    return scans
      .filter((s) => s.qrId === qrId && s.anomalyScore)
      .reduce((sum, s) => sum + (s.anomalyScore || 0), 0);
  };

  const productNameFor = (productId?: string) => {
    if (!productId) return '-';
    const p = products.find((x) => x.id === productId);
    return p ? `${p.name} (${p.sku})` : productId;
  };

  const filteredQrs = selectedProductId
    ? qrs.filter((qr) => qr.productId === selectedProductId)
    : qrs;

  const onCreateProduct = async (e: FormEvent) => {
    e.preventDefault();
    setProductError('');
    setProductSuccess('');
    if (!productName.trim() || !productSku.trim()) {
      setProductError('Name and SKU are required');
      return;
    }
    setProductSaving(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: productName.trim(),
          sku: productSku.trim(),
          canonicalImageUrl: productImage.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setProductError(data.error || 'Failed to create product');
      } else {
        setProductSuccess('Product created. You can now attach batches to it.');
        setProductName('');
        setProductSku('');
        setProductImage('');
      }
    } catch {
      setProductError('Request failed');
    } finally {
      setProductSaving(false);
    }
  };

  return (
    <div className="page">
      <h1>Admin Dashboard</h1>
      <p>Monitor products, QR codes, and scan activity across your supply chain.</p>

      <div className="card card--subtle">
        <h2>Create Product</h2>
        <form onSubmit={onCreateProduct}>
          <label>
            Product Name
            <input
              className="input"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Premium Headphones"
            />
          </label>

          <label>
            SKU / Code
            <input
              className="input"
              value={productSku}
              onChange={(e) => setProductSku(e.target.value)}
              placeholder="e.g. PH-1000"
            />
          </label>

          <label>
            Image URL (optional)
            <input
              className="input"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="https://..."
            />
          </label>

          {productError && <p className="text-error">{productError}</p>}
          {productSuccess && <p style={{ color: '#16a34a', fontSize: 13 }}>{productSuccess}</p>}

          <button className="button" type="submit" disabled={productSaving}>
            {productSaving ? 'Creating…' : 'Create Product'}
          </button>
        </form>
      </div>

      <div className="page-grid">
        <div className="card">
          <h2>QR Codes Overview</h2>
          <div className="flex items-center justify-between mb-4" style={{ gap: 12 }}>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>Filter by product</p>
            <select
              className="select"
              value={selectedProductId}
              onChange={(e) => {
                const value = e.target.value;
                setSelectedProductId(value);
                setSelectedQrId(null);
                setScans([]);
              }}
            >
              <option value="">All products</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{`${p.name} (${p.sku})`}</option>
              ))}
            </select>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Batch</th>
                  <th>Product</th>
                  <th>Scans</th>
                  <th>States</th>
                  <th>Flags</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredQrs.map((qr) => {
                  const flags: string[] = [];
                  if (hasDuplicate(qr.id)) flags.push('Duplicate');
                  const anomaly = anomalyScoreFor(qr.id);
                  if (anomaly) flags.push(`Anomaly x${anomaly}`);
                  return (
                    <tr key={qr.id}>
                      <td style={{ maxWidth: 120, wordBreak: 'break-all' }}>{qr.id}</td>
                      <td>{qr.batchId}</td>
                      <td>{productNameFor(qr.productId)}</td>
                      <td>{qr.scannedCount}</td>
                      <td>
                        {qr.states.manufactured && <span className="badge badge-success">M</span>}{' '}
                        {qr.states.distributed && <span className="badge badge-success">D</span>}{' '}
                        {qr.states.retailed && <span className="badge badge-success">R</span>}{' '}
                        {qr.states.owner && <span className="badge badge-success">C</span>}
                      </td>
                      <td>
                        {flags.length === 0 && <span className="badge">OK</span>}
                        {flags.map((f) => (
                          <span
                            key={f}
                            className={
                              f.startsWith('Duplicate') ? 'badge badge-danger' : 'badge badge-warning'
                            }
                            style={{ marginRight: 4 }}
                          >
                            {f}
                          </span>
                        ))}
                      </td>
                      <td>
                        <button
                          className="button"
                          type="button"
                          onClick={() => loadScans(qr.id)}
                        >
                          View Scans
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2>Scan History {selectedQrId && `for ${selectedQrId}`}</h2>
          {loading && <p>Loading…</p>}
          {!loading && scans.length === 0 && <p>No scans yet.</p>}
          {!loading && scans.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Role</th>
                    <th>Actor</th>
                    <th>Location</th>
                    <th>Duplicate</th>
                    <th>Anomaly</th>
                    <th>Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {scans.map((s) => (
                    <tr key={s.id}>
                      <td>{new Date(s.timestamp).toLocaleString()}</td>
                      <td>{s.role}</td>
                      <td>{s.actorName}</td>
                      <td>
                        {typeof s.location === 'string'
                          ? s.location
                          : s.location
                          ? `${s.location.lat}, ${s.location.lon}`
                          : '-'}
                      </td>
                      <td>{s.isDuplicate ? 'Yes' : 'No'}</td>
                      <td>{s.anomalyScore ? s.anomalyScore : '-'}</td>
                      <td style={{ maxWidth: 140, wordBreak: 'break-all' }}>{s.txHash || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
