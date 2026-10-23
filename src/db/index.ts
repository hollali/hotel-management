import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { Agent, fetch as undiciFetch } from "undici";
import * as schema from "./schema";

// This network has no IPv6 route but undici's auto-select connect (used by
// global fetch) times out on this host instead of falling back to IPv4.
// Force IPv4 by routing the Neon HTTP driver through undici with family: 4.
const ipv4Agent = new Agent({
  connect: { family: 4 } as unknown as Agent.Options["connect"],
});

const ipv4Fetch = ((url: string, options?: RequestInit) =>
  undiciFetch(url, {
    ...options,
    dispatcher: ipv4Agent,
  } as Parameters<typeof undiciFetch>[1])) as unknown as typeof fetch;

neonConfig.fetchFunction = ipv4Fetch;

function createDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}

let _db: ReturnType<typeof drizzle> | null = null;

function getDb() {
  if (!_db) {
    _db = createDb();
  }
  return _db;
}

export const db = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_, prop) {
    return (getDb() as unknown as Record<string | symbol, unknown>)[prop];
  },
});
