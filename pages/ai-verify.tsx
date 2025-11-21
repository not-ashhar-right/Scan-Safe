import { FormEvent, useState } from 'react';

interface AIResponse {
  verdict: 'AUTHENTIC' | 'SUSPECT';
  confidence: number;
  reasons: string[];
  annotatedImageUrl?: string;
  error?: string;
}

export default function AIVerifyPage() {
  const [file, setFile] = useState<File | null>(null);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIResponse | null>(null);
  const [error, setError] = useState('');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setResult(null);
    if (!file) {
      setError('Image file is required');
      return;
    }
    setLoading(true);
    try {
      const form = new FormData();
      form.append('image', file);
      if (token) form.append('token', token);
      const res = await fetch('/api/ai/verify', {
        method: 'POST',
        body: form,
      });
      const data = (await res.json()) as AIResponse;
      if (!res.ok) {
        setError(data.error || 'AI verification failed');
      } else {
        setResult(data);
      }
    } catch (err) {
      setError('Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <h1>AI Image Verification (Mock)</h1>
      <div className="card">
        <form onSubmit={onSubmit}>
          <label>
            Product / QR Image
            <input
              className="input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </label>

          <label>
            Optional QR Token (to link report)
            <textarea
              className="textarea"
              rows={2}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            />
          </label>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Checking…' : 'Run AI Check'}
          </button>
        </form>
      </div>

      {result && (
        <div className="card">
          <h2>
            Verdict: {result.verdict}{' '}
            <span className={result.verdict === 'AUTHENTIC' ? 'badge badge-success' : 'badge badge-danger'}>
              {Math.round(result.confidence * 100)}% confidence
            </span>
          </h2>
          <ul>
            {result.reasons.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
          {result.annotatedImageUrl && (
            <div>
              <h3>Annotated Image</h3>
              <img
                src={result.annotatedImageUrl}
                alt="Annotated"
                style={{ maxWidth: '100%', borderRadius: 4 }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
