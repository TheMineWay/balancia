import { AUTH_CONTROLLER_DEFINITION } from "./controllers/user/auth.controller-definition";
import { USER_PROFILE_CONTROLLER_DEFINITION } from "./controllers/user/user-profile.controller-definition";

export const CONTROLLERS = {
  // Core endpoints
  auth: AUTH_CONTROLLER_DEFINITION,
  userProfile: USER_PROFILE_CONTROLLER_DEFINITION,
  // End core endpoints
} as const;
