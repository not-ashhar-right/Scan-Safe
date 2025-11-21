# ScanSafe-MVP – Working Notes

This document explains what the app does, the tech stack, core flows, and how the main pieces fit together.

---

## 1. High-level purpose

ScanSafe-MVP is a demo app for **product authenticity and traceability** using:

- Signed **QR codes** per item/batch
- **Supply-chain scans** (manufacturer → distributor → retailer → customer)
- **Duplicate / anomaly detection** (same QR used more than once or far apart in a short time)
- Optional **blockchain logging** for each scan
- A mock **AI image verification** endpoint

Everything is stored in **local JSON files** under `data/` – no external database.

---

## 2. Tech stack

- **Framework**: Next.js 13 (Pages Router) + React 18 + TypeScript
- **Styling**: Custom CSS in `styles/globals.css` (app shell, cards, forms)
- **QR generation**: [`qrcode`](https://www.npmjs.com/package/qrcode) – produces PNG data URLs
- **Crypto**: Node `crypto` (HMAC-SHA256)
- **UUIDs**: [`uuid`](https://www.npmjs.com/package/uuid)
- **Filesystem storage**: Node `fs` via helpers in `lib/fs.ts`
- **Blockchain (optional)**: [`ethers`](https://www.npmjs.com/package/ethers`)
- **File uploads / multipart**: [`formidable`](https://www.npmjs.com/package/formidable)
- **QR camera scanning (frontend)**: [`react-qr-reader`](https://www.npmjs.com/package/react-qr-reader)

---

## 3. Project structure (selected)

- `pages/`
  - `_app.tsx` – wraps all pages in `AppLayout` (header + navigation)
  - `index.tsx` – landing page
  - `manufacturer.tsx` – UI to generate QR codes for a product batch
  - `scan.tsx` – supply-chain scan/verify page (with QR camera scanner)
  - `customer.tsx` – customer verify & claim page (with QR camera scanner)
  - `admin.tsx` – admin dashboard (QRs + scan history)
  - `ai-verify.tsx` – AI image verification (mock)
  - `api/` – Next.js API routes (see section 6)
- `components/`
  - `AppLayout.tsx` – top-level app shell (header, nav, content container)
  - `QrScanner.tsx` – client-only camera QR scanner using `react-qr-reader`
- `lib/`
  - `types.ts` – TypeScript interfaces for all core models
  - `fs.ts` – JSON read/write/append helpers (with basic in-process locking)
  - `qr.ts` – QR token payload, HMAC signing, verification utilities
  - `blockchain.ts` – real/mocked blockchain event logger
- `data/`
  - `products.json`, `qrcodes.json`, `scans.json`, `blockchain.json`, `ai_reports.json`
- `scripts/`
  - `seed.js` – JS-based seeding of demo product, batch, and QR codes

---

## 4. Data model (JSON shapes)

TypeScript interfaces live in `lib/types.ts`.

- **Product** (`products.json`)
  - `id: string`
  - `name: string`
  - `sku: string`
  - `canonicalImageUrl?: string`
  - `batches: { id, name, size, createdAt }[]`

- **QRCodeRecord** (`qrcodes.json`)
  - `id: string` – unique QR ID
  - `batchId: string`
  - `productId?: string`
  - `token: string` – signed QR token
  - `signature: string` – HMAC-SHA256 signature (base64url)
  - `qrUrl: string` – PNG data URL for the QR image
  - `createdAt: number` – timestamp ms
  - `states`:
    - `manufactured: number | null`
    - `distributed: number | null`
    - `retailed: number | null`
    - `owner: null | { name: string; ownerId?: string; ts: number }`
  - `scannedCount: number`

- **ScanRecord** (`scans.json`)
  - `id: string`
  - `qrId: string`
  - `role: 'manufacturer' | 'distributor' | 'retailer' | 'customer'`
  - `actorId: string`
  - `actorName: string`
  - `timestamp: number`
  - `location?: { lat: number; lon: number } | string`
  - `deviceInfo?: string`
  - `isDuplicate: boolean`
  - `txHash?: string`
  - `anomalyScore?: number`

- **BlockchainEvent** (`blockchain.json`)
  - `id: string`
  - `qrId: string`
  - `eventType: string` – e.g. `SCAN`, `SCAN_DUPLICATE`, `CLAIM`, `CLAIM_DUPLICATE`
  - `metadata: any` – role, actor info, etc.
  - `txHash: string`
  - `blockNumber: number`
  - `timestamp: number`

- **AIReport** (`ai_reports.json`)
  - `id: string`
  - `qrId?: string`
  - `productId?: string`
  - `imageHash: string` – SHA-256 of the uploaded bytes
  - `verdict: 'AUTHENTIC' | 'SUSPECT'`
  - `confidence: number` (0–1)
  - `reasons: string[]`
  - `annotatedImageUrl?: string`
  - `createdAt: number`

---

## 5. QR token format & signing

Located in `lib/qr.ts` and used in `/api/qr/generate`.

- Payload:

  ```ts
  interface TokenPayload {
    id: string;    // uuidv4()
    batch: string; // batchId
    t: number;     // Date.now()
  }
  ```

- Stringified:

  ```ts
  const payloadStr = JSON.stringify(payload);
  ```

- Signature:

  ```ts
  const signature = crypto
    .createHmac('sha256', PRODUCT_QR_SECRET)
    .update(payloadStr)
    .digest();
  const signatureB64 = base64url(signature);
  ```

- Token:

  ```ts
  token = base64url(payloadStr) + '.' + signatureB64;
  ```

- The QR **encodes** either:
  - `NEXT_PUBLIC_APP_URL/api/qr/verify?token=${token}` (for scanning via URL), or
  - Just the token string (for copy/paste or camera scanners that output text).

Verification (`lib/qr.ts` + `/api/qr/verify`):

- Split `token` on `.` → `[payloadPart, sigPart]`.
- Decode `payloadPart`, recompute HMAC-SHA256 with `PRODUCT_QR_SECRET`.
- Compare base64url signatures; if mismatch → `status: INVALID`.
- If OK, parse payload and look up `qr.id` in `qrcodes.json`.

---

## 6. API routes & flows

All routes live under `pages/api/`.

### `POST /api/qr/generate`

**Input**: `{ productId, batchId, count }`

**Flow**:

1. Validates input and product existence.
2. Loops `count` times and calls `createSignedQrRecord` (in `lib/qr.ts`).
   - Builds payload `{ id, batch, t }`.
   - Signs with HMAC-SHA256.
   - Creates token and QR PNG data URL.
3. Appends new QR records to `qrcodes.json`.
4. Returns tokens and basic info + a placeholder printable URL.

---

### `GET/POST /api/qr/verify`

**GET**: quick validity check

- Validates token signature.
- Fetches QR record from `qrcodes.json`.
- Returns `{ status: 'AUTHENTIC' | 'INVALID', qr? }`.

**POST**: full scan event

Input:

```jsonc
{
  "token": "...",
  "role": "manufacturer|distributor|retailer|customer",
  "actorId": "...",
  "actorName": "...",
  "location?": "lat,lon" | "city" | { lat, lon }
}
```

Steps:

1. Verify token signature and decode payload.
2. Look up QR in `qrcodes.json` by `payload.id`.
3. Determine which state to update (`manufactured`, `distributed`, `retailed`, `owner`) based on `role`.
4. Detect duplicates:
   - If that state is **already set** → `isDuplicate = true`, `status = 'DUPLICATE'`.
   - Else set timestamp and increment `scannedCount`.
5. Anomaly detection (demo logic):
   - If `location` is present and parseable to lat/lon,
   - Compare with previous scans for this QR within 10 minutes;
   - If distance > ~500km, increment `anomalyScore`.
6. Create and persist a `ScanRecord` in `scans.json`.
7. Call `recordBlockchainEvent` to log to real or mocked chain (see next section).

Alias: `POST /api/scan` forwards to the same handler.

---

### `POST /api/claim`

Customer ownership claim.

Input:

```jsonc
{
  "token": "...",
  "ownerName": "...",
  "ownerId": "..." // optional
}
```

Flow:

1. Verify token + locate QR.
2. If `qr.states.owner` already set → mark duplicate claim.
3. Else set `owner = { name, ownerId, ts }` and increment `scannedCount`.
4. Create `ScanRecord` with `role: 'customer'`.
5. Log blockchain event via `recordBlockchainEvent`.

---

### `GET /api/qrs`

- Simple admin listing of all `QRCodeRecord`s.

### `GET /api/scans/:qrId`

- Returns all `ScanRecord`s for a given `qrId`.

---

### `POST /api/ai/verify`

Multipart route (file upload via `formidable`).

Input:

- `image`: product/QR image file (required)
- `token` (optional): QR token to link report to a specific QR/product

Flow:

1. Parse multipart form, read image bytes.
2. Compute a **SHA-256 hash** as a stand-in for a visual/perceptual hash.
3. If `token` is provided and valid, link `qrId`/`productId` from local JSON.
4. Generate mock verdict:
   - `confidence = random in [0.5, 1.0]`
   - `verdict = AUTHENTIC` if `confidence > 0.7` else `SUSPECT`.
5. Copy uploaded image into `public/uploads/` and store its path.
6. Persist an `AIReport` in `ai_reports.json`.
7. Return `{ verdict, confidence, reasons, annotatedImageUrl }`.

---

## 7. Blockchain integration (demo)

In `lib/blockchain.ts`.

Environment variables:

- `WEB3_RPC_URL`
- `WEB3_PRIVATE_KEY`

When both are set:

1. Initialize `ethers.providers.JsonRpcProvider` and `ethers.Wallet`.
2. For each scan/claim event, build JSON `{ qrId, eventType, ts, metadata }`.
3. Hash it with SHA-256 and send a transaction **to self** with `data = 0x + hash`.
4. Wait for 1 confirmation, then log `{ txHash, blockNumber, timestamp }` to `blockchain.json`.

If not set:

- Generate a mock tx: `txHash = 'MOCK_' + randomHex`, `blockNumber = 0`, `timestamp = Date.now()`.
- Append to `blockchain.json` the same way.

---

## 8. Camera QR scanning

Implemented in `components/QrScanner.tsx` using `react-qr-reader` and consumed by:

- `pages/scan.tsx` – supply-chain scan/verify
- `pages/customer.tsx` – customer verify & claim

Behavior:

- Camera is toggled via a **"Scan with camera"** button.
- When a QR is detected:
  - The component emits the raw content via `onToken`.
  - The page helper tries to parse it as a URL and extract `token` from `?token=...`.
  - If that fails, the raw string is used directly as the token.
- The scanned token is dropped into the textarea for visibility and editing.

---

## 9. Frontend UX overview

- **AppLayout** (`components/AppLayout.tsx`)
  - Handles header + navigation + main container.
  - Keeps the UI consistent across all pages.

- **Manufacturer page**
  - Fetches products from `/api/products`.
  - Lets the user choose a product + batch and generate N QR codes.
  - Shows QR images and internal IDs in a responsive grid.

- **Scan page**
  - Lets an actor (manufacturer / distributor / retailer / customer) scan or paste a QR.
  - Records lifecycle states and flags duplicates/anomalies.

- **Customer page**
  - Similar to Scan page but focused on final ownership claim.

- **Admin page**
  - Lists all QRs, scan counts, state badges (M/D/R/C), duplicate & anomaly flags.
  - Drill-down view of scan history with timestamps, actors, locations, and tx hashes.

- **AI Verify page**
  - Simple form to upload an image and (optionally) attach a QR token.
  - Displays verdict, confidence and the stored image URL.

---

## 10. Summary

ScanSafe-MVP is a **self-contained Next.js prototype** that:

- Generates **signed** QR codes tied to a product batch.
- Tracks supply-chain events and highlights **duplicates** and **anomalies**.
- Logs events to either a real blockchain (when configured) or a mock ledger in JSON.
- Provides a mock **AI verifier** for product images.
- Uses only **local JSON files** for persistence, making it easy to reset and demo.
