import { USER_CONTROLLER_DEFINITION } from "@/definitions/controllers/user/user.controller-definition";

export const CONTROLLERS = {
  // Core endpoints
  user: USER_CONTROLLER_DEFINITION,
  // End core endpoints
} as const;
