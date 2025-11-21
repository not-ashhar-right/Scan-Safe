import type { NextApiRequest, NextApiResponse } from 'next';
import { readJson, writeJson } from '../../lib/fs';
import type { Product } from '../../lib/types';
import { v4 as uuidv4 } from 'uuid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const products = await readJson<Product[]>('products.json', []);
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    const { name, sku, canonicalImageUrl } = req.body || {};
    if (!name || !sku) {
      return res.status(400).json({ error: 'name and sku are required' });
    }

    const products = await readJson<Product[]>('products.json', []);
    const id = `prod-${uuidv4()}`;
    const newProduct: Product = {
      id,
      name: String(name),
      sku: String(sku),
      canonicalImageUrl: canonicalImageUrl ? String(canonicalImageUrl) : undefined,
      batches: [],
    };

    await writeJson('products.json', [...products, newProduct]);
    return res.status(201).json(newProduct);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
