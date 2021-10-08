import { customAlphabet } from "nanoid";

export function generateShortId() {
  const allowedTypes = "abcdefghijklmnoprstuwvxyz01234567890";
  const generator = customAlphabet(allowedTypes, 6);
  const shortId = generator();

  return shortId;
}
