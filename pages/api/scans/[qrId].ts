import type { NextApiRequest, NextApiResponse } from 'next';
import { readJson } from '../../../lib/fs';
import type { ScanRecord } from '../../../lib/types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { qrId } = req.query;
  if (!qrId || typeof qrId !== 'string') {
    return res.status(400).json({ error: 'qrId is required' });
  }

  const scans = await readJson<ScanRecord[]>('scans.json', []);
  const filtered = scans.filter((s) => s.qrId === qrId);
  return res.status(200).json(filtered);
}
