import type { NextApiRequest, NextApiResponse } from 'next';
import { readJson } from '../../lib/fs';
import type { QRCodeRecord } from '../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const qrs = await readJson<QRCodeRecord[]>('qrcodes.json', []);
  return res.status(200).json(qrs);
}
