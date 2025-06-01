import { type ICallback } from "@core/callbacks/callback";
import { loginCallback } from "@core/callbacks/callbacks/login.callback";

/* Object definition */

export const CALLBACKS: Record<string, ICallback> = {
  auth: loginCallback,
};
