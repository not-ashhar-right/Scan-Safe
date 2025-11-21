import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { verifyToken } from '../../../lib/qr';
import { appendJson } from '../../../lib/fs';
import type { AIReport, Product } from '../../../lib/types';
import { readJson } from '../../../lib/fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const form = formidable({ multiples: false });

  const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fld, fls) => {
        if (err) reject(err);
        else resolve({ fields: fld, files: fls });
      });
    },
  );

  const fileAny = (files.image || Object.values(files)[0]) as formidable.File | formidable.File[] | undefined;
  const file = Array.isArray(fileAny) ? fileAny[0] : fileAny;

  if (!file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const filePath = (file as any).filepath || (file as any).path;
  const buffer = await fs.promises.readFile(filePath);
  const imageHash = crypto.createHash('sha256').update(buffer).digest('hex');

  let qrId: string | undefined;
  let productId: string | undefined;

  const tokenField = fields.token as string | undefined;
  if (tokenField) {
    const verification = verifyToken(tokenField);
    if (verification.valid && verification.payload) {
      qrId = verification.payload.id;
      const products = await readJson<Product[]>('products.json', []);
      const qrs = await readJson<any[]>('qrcodes.json', []);
      const qr = qrs.find((q) => q.id === qrId);
      if (qr && qr.productId) {
        productId = qr.productId;
      } else if (products.length > 0) {
        productId = products[0].id;
      }
    }
  }

  const rand = Math.random();
  const confidence = 0.5 + rand * 0.5; // 0.5-1.0
  const verdict: 'AUTHENTIC' | 'SUSPECT' = confidence > 0.7 ? 'AUTHENTIC' : 'SUSPECT';
  const reasons: string[] = [
    verdict === 'AUTHENTIC'
      ? 'Image features look consistent with known product examples (simulated).'
      : 'Visual differences or low confidence detected (simulated).',
  ];

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  await fs.promises.mkdir(uploadsDir, { recursive: true });
  const outName = `ai_${Date.now()}_${file.originalFilename || 'upload'}`;
  const outPath = path.join(uploadsDir, outName);
  await fs.promises.copyFile(filePath, outPath);
  const annotatedImageUrl = `/uploads/${outName}`;

  const report: AIReport = {
    id: uuidv4(),
    qrId,
    productId,
    imageHash,
    verdict,
    confidence,
    reasons,
    annotatedImageUrl,
    createdAt: Date.now(),
  };

  await appendJson<AIReport>('ai_reports.json', report);

  return res.status(200).json({
    verdict,
    confidence,
    reasons,
    annotatedImageUrl,
  });
}
