import {
  AUTH_CONTROLLER_DEFINITION,
  USER_CONTROLLER_DEFINITION,
} from "@/definitions/controllers/core";

export const CONTROLLERS = {
  // Core endpoints
  user: USER_CONTROLLER_DEFINITION,
  auth: AUTH_CONTROLLER_DEFINITION,
  // End core endpoints
} as const;
