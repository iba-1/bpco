export interface PendingAuth {
  codeVerifier: string;
  provider: string;
  createdAt: number;
}

const TTL_MS = 10 * 60 * 1000;

export function createPendingStore() {
  const entries = new Map<string, PendingAuth>();

  function set(state: string, entry: PendingAuth): void {
    entries.set(state, entry);
  }

  function get(state: string): PendingAuth | null {
    const entry = entries.get(state);
    if (!entry) return null;
    if (Date.now() - entry.createdAt > TTL_MS) {
      entries.delete(state);
      return null;
    }
    return entry;
  }

  function del(state: string): void {
    entries.delete(state);
  }

  return { set, get, delete: del };
}