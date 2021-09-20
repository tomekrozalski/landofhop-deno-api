import randomBytes from "https://deno.land/std@0.107.0/node/_crypto/randomBytes.ts";

export function createSessionToken(): string {
  return randomBytes(43).toString("hex");
}
