import { AuthService } from "@core/api/auth/auth.service";
import { Endpoint } from "@core/decorators/endpoints/endpoint.decorator";
import { Jwt } from "@core/decorators/user/jwt.decorator";
import { Controller } from "@nestjs/common";
import {
  CONTROLLERS,
  getController,
  type InferEndpointResponseDTO,
} from "@shared/api-definition";
import { JwtToken } from "@shared/models";

const CONTROLLER = CONTROLLERS.auth;

@Controller(getController(CONTROLLER))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Endpoint(CONTROLLER, "check-in")
  async checkIn(
    @Jwt() jwt: JwtToken,
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "check-in">> {
    return await this.authService.checkIn(jwt);
  }
}
