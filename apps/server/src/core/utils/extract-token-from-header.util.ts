import type { Request } from "express";

export const extractTokenFromHeader = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;

  // Check if the header starts with "Bearer "
  if (authHeader.startsWith("Bearer ")) {
    // Extract the token by removing the "Bearer " prefix
    return authHeader.slice(7).trim();
  }

  // If the header does not start with "Bearer ", return null
  return null;
};
