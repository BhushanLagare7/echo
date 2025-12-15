"use node";

import Cryptr from "cryptr";

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error("ECRYPTION_KEY is not defined");
}

const cryptr = new Cryptr(ENCRYPTION_KEY);

export function encrypt(text: string) {
  return cryptr.encrypt(text);
}

export function decrypt(text: string) {
  return cryptr.decrypt(text);
}

export function parseSecretString<T = Record<string, unknown>>(
  secretString: string
): T | null {
  try {
    return JSON.parse(secretString) as T;
  } catch (error) {
    console.error("Failed to parse secret string:", error);
    return null;
  }
}
