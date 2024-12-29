import { ControllerDefinition } from "../types";
import { AUTH_CONTROLLER_DEFINITION } from "./controllers/auth.controller-definition";

export const ENDPOINTS = {
  auth: AUTH_CONTROLLER_DEFINITION,
} as const satisfies Record<string, ControllerDefinition>;
