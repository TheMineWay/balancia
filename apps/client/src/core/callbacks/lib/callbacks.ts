import { loginCallback } from "@core/callbacks/data/callbacks/login.callback";
import type { ICallback } from "@core/callbacks/lib/callback";

/* Object definition */

export const CALLBACKS: Record<string, ICallback> = {
	auth: loginCallback,
};
