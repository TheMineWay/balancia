import { Callback } from "@core/callbacks/callback";
import { oidcUserManager } from "@core/components/auth/sign-in/authentik/oidc.manager";
import z from "zod";

const LOGIN_SCHEMA = z.object({
  code: z.string(),
  state: z.string(),
  fromUrl: z.string().url().optional(),
});

export const loginCallback = new Callback({
  schema: LOGIN_SCHEMA,
  urlMatcher: /^auth$/,
  onCallback: async (data) => {
    const user = await oidcUserManager.signinRedirectCallback();
    console.log({ user });

    window.location.href = data.fromUrl ?? "/";
  },
});
