import { SetMetadata } from "@nestjs/common";

/**
 * Metadata key used to mark endpoints as public (not requiring authentication).
 */
export const IS_PUBLIC_KEY = "isPublic";

/**
 * Decorator to mark endpoints as public, bypassing authentication requirements.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
