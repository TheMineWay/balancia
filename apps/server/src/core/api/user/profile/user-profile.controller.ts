import { Controller, Put } from "@nestjs/common";
import { CONTROLLERS, getController } from "@shared/api-definition";

const CONTROLLER = CONTROLLERS.userProfile;

@Controller(getController(CONTROLLER))
export class UserProfileController {
  @Put(CONTROLLER.endpoints.update.getPath())
  async update() {}
}
