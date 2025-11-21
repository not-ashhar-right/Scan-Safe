import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');

const fileLocks = new Map<string, Promise<void>>();

async function ensureDataDir() {
  await fs.promises.mkdir(dataDir, { recursive: true });
}

async function ensureFile(fileName: string, defaultContent: string) {
  await ensureDataDir();
  const fullPath = path.join(dataDir, fileName);
  try {
    await fs.promises.access(fullPath, fs.constants.F_OK);
  } catch {
    await fs.promises.writeFile(fullPath, defaultContent, 'utf8');
  }
}

async function withFileLock<T>(fileName: string, fn: () => Promise<T>): Promise<T> {
  const fullPath = path.join(dataDir, fileName);
  const previous = fileLocks.get(fullPath) || Promise.resolve();

  let resolveCurrent: () => void;
  const current = new Promise<void>((resolve) => {
    resolveCurrent = resolve;
  });

  fileLocks.set(fullPath, previous.then(() => current));

  await previous;
  try {
    const result = await fn();
    return result;
  } finally {
    resolveCurrent!();
    if (fileLocks.get(fullPath) === current) {
      fileLocks.delete(fullPath);
    }
  }
}

export async function readJson<T>(fileName: string, defaultValue: T): Promise<T> {
  await ensureFile(fileName, Array.isArray(defaultValue) ? '[]' : '{}');
  const fullPath = path.join(dataDir, fileName);
  try {
    const raw = await fs.promises.readFile(fullPath, 'utf8');
    if (!raw.trim()) {
      return defaultValue;
    }
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

export async function writeJson<T>(fileName: string, data: T): Promise<void> {
  await withFileLock(fileName, async () => {
    const fullPath = path.join(dataDir, fileName);
    await ensureDataDir();
    await fs.promises.writeFile(fullPath, JSON.stringify(data, null, 2), 'utf8');
  });
}

export async function appendJson<T>(fileName: string, entry: T): Promise<T> {
  await withFileLock(fileName, async () => {
    const fullPath = path.join(dataDir, fileName);
    await ensureFile(fileName, '[]');
    const raw = await fs.promises.readFile(fullPath, 'utf8');
    const arr = raw.trim() ? (JSON.parse(raw) as T[]) : ([] as T[]);
    arr.push(entry);
    await fs.promises.writeFile(fullPath, JSON.stringify(arr, null, 2), 'utf8');
  });
  return entry;
}
