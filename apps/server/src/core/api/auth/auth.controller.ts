import { ENV } from "@constants/conf/env.constant";
import { ValidatedBody } from "@core/decorators/validation/validated-body.decorator";
import { Public } from "@core/guards/auth/public.guard";
import { Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Throttle } from "@nestjs/throttler";
import {
  CONTROLLERS,
  getController,
  getEndpoint,
  getEndpointDTO,
  InferEndpointDTO,
  InferEndpointResponseDTO,
} from "@shared/api-definition";
import { AuthService } from "./auth.service";

const CONTROLLER = CONTROLLERS.auth;
@Controller(getController(CONTROLLER))
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({
    default: { limit: ENV.rateLimit.maxLoginRequestsPerMinute, ttl: 60 * 1000 },
  })
  @Public()
  @HttpCode(HttpStatus.OK)
  @Post(getEndpoint(CONTROLLER, "login"))
  login(
    @ValidatedBody(getEndpointDTO(CONTROLLER, "login"))
    loginDto: InferEndpointDTO<typeof CONTROLLER, "login">
  ): Promise<InferEndpointResponseDTO<typeof CONTROLLER, "login">> {
    return this.authService.signIn(loginDto);
  }
}
