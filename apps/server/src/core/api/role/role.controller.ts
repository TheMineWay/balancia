import { Controller } from "@nestjs/common";
import { CONTROLLERS, getController } from "@shared/api-definition";

const CONTROLLER = CONTROLLERS.role;

@Controller(getController(CONTROLLER))
export class RoleController {
  // Roles
}
