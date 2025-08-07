import { loginCallback } from "@core-fts/callbacks/data/callbacks/login.callback";
import type { ICallback } from "@core-fts/callbacks/lib/callback";

/* Object definition */

export const CALLBACKS: Record<string, ICallback> = {
	auth: loginCallback,
};
