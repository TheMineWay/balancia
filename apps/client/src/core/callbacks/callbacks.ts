import { Callback, type ICallback } from "@core/callbacks/callback";
import { WAREHOUSES } from "@core/constants/device-storage/warehouses.constant";
import {
  type LocalStorageConnector,
  WebWarehouse,
} from "@themineway/smart-storage-js";
import { z } from "zod";

export const CALLBACKS: Record<string, ICallback> = {
  auth: new Callback({
    schema: z.object({
      code: z.string(),
      state: z.string(),
      fromUrl: z.string().url().optional(),
    }),
    urlMatcher: /^auth$/,
    onCallback: async (data, schema) => {
      const ls = WebWarehouse.getConnector(
        WAREHOUSES.ls
      ) as LocalStorageConnector;
      ls.set("e", data, schema);

      // Once auth data is stored, redirect to the original URL or home
      window.location.href = data.fromUrl ?? "/";
    },
  }),
};
