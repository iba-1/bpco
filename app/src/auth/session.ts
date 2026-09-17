export interface SessionStorage {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface SessionStore {
  save(token: string): Promise<void>;
  get(): Promise<string | null>;
  clear(): Promise<void>;
  isAuthenticated(): Promise<boolean>;
}

const SESSION_KEY = "bpco.session";

export function createSessionStore(options: {
  storage: SessionStorage;
}): SessionStore {
  async function save(token: string): Promise<void> {
    await options.storage.setItem(SESSION_KEY, token);
  }

  async function get(): Promise<string | null> {
    const value = await options.storage.getItem(SESSION_KEY);
    return value && value.length > 0 ? value : null;
  }

  async function clear(): Promise<void> {
    await options.storage.removeItem(SESSION_KEY);
  }

  async function isAuthenticated(): Promise<boolean> {
    return (await get()) !== null;
  }

  return { save, get, clear, isAuthenticated };
}