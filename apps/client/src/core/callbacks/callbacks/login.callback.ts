import { Callback } from "@core/callbacks/callback";
import { endpointMutation } from "@core/utils/request/endpoint-mutation.util";
import { CONTROLLERS } from "@shared/api-definition";
import axios from "axios";
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
    const mutation = endpointMutation(CONTROLLERS.auth, "login", (o) =>
      axios.request(o)
    );

    const response = await mutation({
      code: data.code,
    });

    console.log({ response });

    // Once auth data is stored, redirect to the original URL or home
    window.location.href = data.fromUrl ?? "/";
  },
});
