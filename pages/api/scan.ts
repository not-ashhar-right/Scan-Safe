import type { NextApiRequest, NextApiResponse } from 'next';
import handler from './qr/verify';

export default function scanHandler(req: NextApiRequest, res: NextApiResponse) {
  return handler(req, res);
}
