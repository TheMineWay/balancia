import { createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

export function hash(text: string): string {
  return createHash("sha256").update(text).digest("base64");
}

export function hashWithSalt(password: string): string {
  const salt: string = randomBytes(16).toString("base64");
  const hashedPassword: string = scryptSync(password, salt, 64).toString(
    "base64",
  );

  return `${salt}:${hashedPassword}`;
}

export function compareHash(
  originalPassword: string,
  strangePassword: string,
): boolean {
  return hash(originalPassword) === hash(strangePassword);
}

export function compareHashWithSalt(
  originalPassword: string,
  strangePassword: string,
): boolean {
  const [salt, key]: string[] = originalPassword.split(":");

  const hashedBuffer: Buffer = scryptSync(strangePassword, salt, 64);
  const keyBuffer: Buffer = Buffer.from(key, "base64");

  // Compare avoiding timing attacks
  const match: boolean = timingSafeEqual(hashedBuffer, keyBuffer);
  return match;
}
