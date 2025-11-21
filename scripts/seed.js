const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const dataDir = path.join(process.cwd(), 'data');

function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readJson(fileName, defaultValue) {
  ensureDataDir();
  const fullPath = path.join(dataDir, fileName);
  if (!fs.existsSync(fullPath)) return defaultValue;
  const raw = fs.readFileSync(fullPath, 'utf8');
  if (!raw.trim()) return defaultValue;
  try {
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function writeJson(fileName, data) {
  ensureDataDir();
  const fullPath = path.join(dataDir, fileName);
  fs.writeFileSync(fullPath, JSON.stringify(data, null, 2), 'utf8');
}

function base64urlEncode(buf) {
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function getSecret() {
  const secret = process.env.PRODUCT_QR_SECRET;
  if (!secret) {
    throw new Error('PRODUCT_QR_SECRET is not set in .env.local');
  }
  return secret;
}

function getAppUrl() {
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

async function createSignedQrRecord(options) {
  const id = uuidv4();
  const payload = {
    id,
    batch: options.batchId,
    t: Date.now(),
  };
  const payloadStr = JSON.stringify(payload);
  const secret = getSecret();
  const signature = crypto.createHmac('sha256', secret).update(payloadStr).digest();
  const signatureB64 = base64urlEncode(signature);
  const token = `${base64urlEncode(Buffer.from(payloadStr))}.${signatureB64}`;

  const urlToEncode = `${getAppUrl()}/api/qr/verify?token=${encodeURIComponent(token)}`;
  const qrUrl = await QRCode.toDataURL(urlToEncode, { margin: 1, width: 256 });

  return {
    id,
    batchId: options.batchId,
    productId: options.productId,
    token,
    signature: signatureB64,
    qrUrl,
    createdAt: Date.now(),
    states: {
      manufactured: null,
      distributed: null,
      retailed: null,
      owner: null,
    },
    scannedCount: 0,
  };
}

async function main() {
  getSecret();
  console.log('Seeding demo data (JS script)...');

  let products = readJson('products.json', []);

  let product;
  if (products.length === 0) {
    product = {
      id: 'prod-1',
      name: 'SafeScan Demo Product',
      sku: 'SS-DEMO-001',
      canonicalImageUrl: '/uploads/demo-product.png',
      batches: [],
    };
    products.push(product);
  } else {
    product = products[0];
  }

  const batchId = 'batch-1';
  if (!product.batches.find((b) => b.id === batchId)) {
    product.batches.push({
      id: batchId,
      name: 'Demo Batch 1',
      size: 10,
      createdAt: Date.now(),
    });
  }

  writeJson('products.json', products);

  const existingQrs = readJson('qrcodes.json', []);
  const existingForBatch = existingQrs.filter((q) => q.batchId === batchId);
  const toCreate = Math.max(0, 10 - existingForBatch.length);

  const newRecords = [];
  for (let i = 0; i < toCreate; i += 1) {
    const rec = await createSignedQrRecord({ productId: product.id, batchId });
    newRecords.push(rec);
  }

  if (newRecords.length > 0) {
    writeJson('qrcodes.json', existingQrs.concat(newRecords));
  }

  console.log('Seed complete. Product, batch, and QR codes are ready.');
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
