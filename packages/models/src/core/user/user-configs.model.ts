import { z } from "zod";

export const USER_CONFIGS_SCHEMA = z.object({});

export type UserConfigsModel = z.infer<typeof USER_CONFIGS_SCHEMA>;
