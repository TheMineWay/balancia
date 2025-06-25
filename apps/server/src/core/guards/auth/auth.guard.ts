import { AuthService } from "@core/api/auth/auth.service";
import { IS_PUBLIC_KEY } from "@core/guards/auth/public.guard";
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { extractTokenFromHeader } from "@utils/extract-token-from-header.util";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const token = extractTokenFromHeader(context.switchToHttp().getRequest());

    if (!token) throw new UnauthorizedException();

    const user = AuthService.parseJwtToken(token);

    return true;
  }
}
