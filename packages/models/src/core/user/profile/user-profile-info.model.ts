import { USER_CONFIGS_SCHEMA } from "@/core/user/user-configs.model";
import { USER_SCHEMA } from "@/core/user/user.model";
import { z } from "zod";

export const USER_PROFILE_INFO_SCHEMA = z.object({
  user: USER_SCHEMA,
  configs: USER_CONFIGS_SCHEMA,
});

export type UserProfileInfoModel = z.infer<typeof USER_PROFILE_INFO_SCHEMA>;
