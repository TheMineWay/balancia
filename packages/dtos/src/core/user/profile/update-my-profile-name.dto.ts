import { USER_SCHEMA } from "@shared/models";
import { z } from "zod";

export const UPDATE_MY_PROFILE_NAME_DTO = USER_SCHEMA.pick({
    name: true,
    lastName: true
})

export type UpdateMyProfileNameDTO = z.infer<typeof UPDATE_MY_PROFILE_NAME_DTO>