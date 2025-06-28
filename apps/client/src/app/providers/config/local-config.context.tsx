import type { ProviderSetter } from "@providers/provider-setter.type";
import { createContext } from "react";
import { z } from "zod";

export const LOCAL_CONFIG_SCHEMA = z.object({});

export type LocalConfig = z.infer<typeof LOCAL_CONFIG_SCHEMA>;

export const LocalConfigContext = createContext<ProviderSetter<LocalConfig>>(
  null!
);
