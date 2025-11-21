import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="page">
      <h1>Protect Every Product With One Scan.</h1>
      <p>One Product. One QR. Complete AI-Powered Authenticity.</p>

      <div className="card">
        <h2>What Is ScanSafe?</h2>
        <p>
          ScanSafe is an end-to-end product authentication and traceability platform designed to help
          companies eliminate counterfeit products and secure their entire supply chain.
        </p>
        <p>
          We provide unique, secure QR codes for every product you manufacture. Each scan—from factory to
          customer—is recorded, creating a tamper-proof digital trail that proves authenticity, prevents
          duplication, and gives companies full visibility into product movement.
        </p>
      </div>

      <div className="card">
        <h2>Why ScanSafe Exists</h2>
        <p>
          Counterfeit goods are a global problem affecting pharmaceuticals, electronics, cosmetics,
          automotive parts, and food. Customers cannot verify if a product is genuine, and companies have no
          way to see where counterfeit products enter their supply chain.
        </p>
        <p>
          ScanSafe solves this by transforming every product into a verifiable, traceable digital asset.
        </p>
      </div>

      <div className="card">
        <h2>How ScanSafe Works</h2>
        <h3>1. Unique QR for Every Product</h3>
        <ul>
          <li>We generate secure, digitally signed QR codes that cannot be forged.</li>
          <li>Each QR works only once per supply-chain stage, making copied QR codes instantly detectable.</li>
        </ul>

        <h3>2. Real-Time Supply-Chain Tracking</h3>
        <ul>
          <li>Every scan—manufacturer, distributor, retailer, and customer—is logged.</li>
          <li>Companies get complete visibility, duplicate alerts, and product movement history.</li>
        </ul>

        <h3>3. AI-Based Fake Packaging Detection</h3>
        <ul>
          <li>Customers can upload a photo of the product.</li>
          <li>
            Our AI analyzes packaging, labels, color tones, and patterns to detect fakes instantly.
          </li>
        </ul>

        <h3>4. Admin Dashboard for Companies</h3>
        <ul>
          <li>Manage all products, batches, QR scans, authenticity checks, and alerts in one place.</li>
          <li>
            Customer care becomes easier with instant product history and ownership records.
          </li>
        </ul>
      </div>

      <div className="card">
        <h2>Key Benefits</h2>
        <ul>
          <li>Stops counterfeit products before they reach customers.</li>
          <li>Tracks every movement of every product.</li>
          <li>Builds customer trust with instant authenticity verification.</li>
          <li>Reduces customer-care workload.</li>
          <li>Improves brand protection and product safety.</li>
        </ul>
      </div>

      <div className="card">
        <h2>Who Is ScanSafe For?</h2>
        <ul>
          <li>Pharmaceutical companies</li>
          <li>Electronics manufacturers</li>
          <li>Cosmetics &amp; personal care brands</li>
          <li>FMCG &amp; packaged goods</li>
          <li>Automotive parts suppliers</li>
          <li>Government &amp; customs</li>
          <li>E-commerce platforms &amp; marketplaces</li>
        </ul>
      </div>

      <div className="card">
        <h2>Why Companies Choose Us</h2>
        <ul>
          <li>Extremely low per-product cost (as low as ₹0.50 per QR).</li>
          <li>Easy integration for small and large manufacturers.</li>
          <li>Works even without a database (JSON/local storage MVP).</li>
          <li>QR codes cannot be reused or copied.</li>
          <li>AI and blockchain options for high security.</li>
        </ul>
      </div>

      <div className="card">
        <h2>Quick Links</h2>
        <p>
          <Link href="/manufacturer">Generate QR Codes (Manufacturer)</Link>
        </p>
        <p>
          <Link href="/scan">Scan / Verify (Supply chain)</Link>
        </p>
        <p>
          <Link href="/customer">Customer Verify &amp; Claim</Link>
        </p>
        <p>
          <Link href="/admin">Admin Dashboard</Link>
        </p>
        <p>
          <Link href="/ai-verify">AI Image Verify (Mock)</Link>
        </p>
      </div>
    </div>
  );
}
