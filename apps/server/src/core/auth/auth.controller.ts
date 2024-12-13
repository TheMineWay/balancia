import { LoginDTO } from "@dto/core/auth/login.dto";
import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { Public } from "src/guards/auth/public.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginDto: LoginDTO) {
    return this.authService.signIn(loginDto.login, loginDto.password);
  }
}
