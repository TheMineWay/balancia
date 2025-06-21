import { Controller } from "@nestjs/common";
import { CONTROLLERS, getController } from "@shared/api-definition";

const CONTROLLER = CONTROLLERS.auth;
@Controller(getController(CONTROLLER))
export class AuthController {
  constructor() {}
}
