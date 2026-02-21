import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="page">
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h1 style={{ fontSize: 56, marginBottom: 20 }}>
          Protect Every Product<br />With One Scan.
        </h1>
        <p style={{ fontSize: 22, color: 'var(--text-secondary)', maxWidth: 700, margin: '0 auto' }}>
          One Product. One QR. Complete AI-Powered Authenticity.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: 20, 
        marginBottom: 40 
      }}>
        <Link href="/manufacturer" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(30, 41, 59, 0.5))',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            cursor: 'pointer',
            height: '100%'
          }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>🏭</div>
            <h3 style={{ marginBottom: 8 }}>Manufacturer</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              Generate secure QR codes for your products
            </p>
          </div>
        </Link>

        <Link href="/scan" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(30, 41, 59, 0.5))',
            borderColor: 'rgba(6, 182, 212, 0.3)',
            cursor: 'pointer',
            height: '100%'
          }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>📦</div>
            <h3 style={{ marginBottom: 8 }}>Supply Chain</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              Scan and track products through distribution
            </p>
          </div>
        </Link>

        <Link href="/customer" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(30, 41, 59, 0.5))',
            borderColor: 'rgba(16, 185, 129, 0.3)',
            cursor: 'pointer',
            height: '100%'
          }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>🛡️</div>
            <h3 style={{ marginBottom: 8 }}>Customer</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              Verify authenticity and claim ownership
            </p>
          </div>
        </Link>

        <Link href="/admin" style={{ textDecoration: 'none' }}>
          <div className="card" style={{ 
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(30, 41, 59, 0.5))',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            cursor: 'pointer',
            height: '100%'
          }}>
            <div style={{ fontSize: 42, marginBottom: 12 }}>📊</div>
            <h3 style={{ marginBottom: 8 }}>Admin</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0 }}>
              Monitor and manage all QR codes
            </p>
          </div>
        </Link>
      </div>

      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>🎯</span> What Is ScanSafe?
        </h2>
        <p>
          ScanSafe is an end-to-end product authentication and traceability platform designed to help
          companies eliminate counterfeit products and secure their entire supply chain.
        </p>
        <p style={{ margin: 0 }}>
          We provide unique, secure QR codes for every product you manufacture. Each scan—from factory to
          customer—is recorded, creating a tamper-proof digital trail that proves authenticity, prevents
          duplication, and gives companies full visibility into product movement.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <div className="card card--subtle">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>❓</span> Why ScanSafe Exists
          </h2>
          <p style={{ margin: 0 }}>
            Counterfeit goods are a global problem affecting pharmaceuticals, electronics, cosmetics,
            automotive parts, and food. Customers cannot verify if a product is genuine, and companies have no
            way to see where counterfeit products enter their supply chain. ScanSafe transforms every product 
            into a verifiable, traceable digital asset.
          </p>
        </div>

        <div className="card card--subtle">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>⚡</span> Key Benefits
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Stops counterfeit products before they reach customers</li>
            <li>Tracks every movement of every product</li>
            <li>Builds customer trust with instant verification</li>
            <li>Reduces customer-care workload</li>
            <li>Improves brand protection and product safety</li>
          </ul>
        </div>
      </div>

      <div className="card">
        <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 28 }}>⚙️</span> How ScanSafe Works
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24, marginTop: 24 }}>
          <div style={{ 
            padding: 20, 
            background: 'rgba(30, 41, 59, 0.5)', 
            borderRadius: 12,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>1️⃣</div>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--accent)' }}>Unique QR for Every Product</h3>
            <ul style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, paddingLeft: 20 }}>
              <li>Secure, digitally signed QR codes that cannot be forged</li>
              <li>Each QR works only once per stage, detecting copies instantly</li>
            </ul>
          </div>

          <div style={{ 
            padding: 20, 
            background: 'rgba(30, 41, 59, 0.5)', 
            borderRadius: 12,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>2️⃣</div>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--accent-secondary)' }}>Real-Time Supply-Chain Tracking</h3>
            <ul style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, paddingLeft: 20 }}>
              <li>Every scan—manufacturer to customer—is logged</li>
              <li>Complete visibility, duplicate alerts, movement history</li>
            </ul>
          </div>

          <div style={{ 
            padding: 20, 
            background: 'rgba(30, 41, 59, 0.5)', 
            borderRadius: 12,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>3️⃣</div>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--success)' }}>AI-Based Fake Detection</h3>
            <ul style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, paddingLeft: 20 }}>
              <li>Upload product photo for instant analysis</li>
              <li>AI checks packaging, labels, colors, and patterns</li>
            </ul>
          </div>

          <div style={{ 
            padding: 20, 
            background: 'rgba(30, 41, 59, 0.5)', 
            borderRadius: 12,
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>4️⃣</div>
            <h3 style={{ fontSize: 18, marginBottom: 8, color: 'var(--warning)' }}>Admin Dashboard</h3>
            <ul style={{ fontSize: 14, color: 'var(--text-secondary)', margin: 0, paddingLeft: 20 }}>
              <li>Manage products, batches, QR scans, and alerts</li>
              <li>Instant product history and ownership records</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        <div className="card">
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>🏢</span> Who Is ScanSafe For?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {[
              'Pharmaceutical companies',
              'Electronics manufacturers',
              'Cosmetics & personal care',
              'FMCG & packaged goods',
              'Automotive parts suppliers',
              'Government & customs',
              'E-commerce platforms',
              'Luxury goods brands'
            ].map((industry, idx) => (
              <div key={idx} style={{ 
                padding: 12, 
                background: 'rgba(139, 92, 246, 0.1)', 
                borderRadius: 8,
                fontSize: 13,
                border: '1px solid rgba(139, 92, 246, 0.2)'
              }}>
                ✓ {industry}
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ 
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(30, 41, 59, 0.5))',
          borderColor: 'rgba(139, 92, 246, 0.3)'
        }}>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 28 }}>⭐</span> Why Choose Us
          </h2>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            <li>Extremely low cost (as low as ₹0.50 per QR)</li>
            <li>Easy integration for all manufacturers</li>
            <li>QR codes cannot be reused or copied</li>
            <li>AI and blockchain security options</li>
            <li>Works even without database (MVP ready)</li>
            <li>24/7 monitoring and support</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ 
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(30, 41, 59, 0.5))',
        borderColor: 'rgba(6, 182, 212, 0.3)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>Ready to Protect Your Products?</h2>
        <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 24 }}>
          Join hundreds of companies securing their supply chains with ScanSafe
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/manufacturer">
            <button className="button" style={{ fontSize: 16, padding: '14px 28px' }}>
              🚀 Get Started
            </button>
          </Link>
          <Link href="/admin">
            <button className="button button-secondary" style={{ fontSize: 16, padding: '14px 28px' }}>
              📊 View Demo Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}