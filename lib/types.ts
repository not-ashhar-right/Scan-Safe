export type Role = 'manufacturer' | 'distributor' | 'retailer' | 'customer';

export interface QRStates {
  manufactured: number | null;
  distributed: number | null;
  retailed: number | null;
  owner: null | { name: string; ownerId?: string; ts: number };
}

export interface QRCodeRecord {
  id: string;
  batchId: string;
  productId?: string;
  token: string;
  signature: string;
  qrUrl: string; // data URL or path
  createdAt: number;
  states: QRStates;
  scannedCount: number;
}

export interface ScanRecord {
  id: string;
  qrId: string;
  role: Role;
  actorId: string;
  actorName: string;
  timestamp: number;
  location?: { lat: number; lon: number } | string;
  deviceInfo?: string;
  isDuplicate: boolean;
  txHash?: string;
  anomalyScore?: number;
}

export interface ProductBatch {
  id: string;
  name: string;
  size: number;
  createdAt: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  canonicalImageUrl?: string;
  batches: ProductBatch[];
}

export interface BlockchainEvent {
  id: string;
  qrId: string;
  eventType: string;
  metadata: any;
  txHash: string;
  blockNumber: number;
  timestamp: number;
}

export interface AIReport {
  id: string;
  qrId?: string;
  productId?: string;
  imageHash: string;
  verdict: 'AUTHENTIC' | 'SUSPECT';
  confidence: number; // 0-1
  reasons: string[];
  annotatedImageUrl?: string;
  createdAt: number;
}
