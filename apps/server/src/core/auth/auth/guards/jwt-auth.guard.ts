import { IS_PUBLIC_KEY } from "@core/auth/auth/guards/public.guard";
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") implements CanActivate {
	constructor(private readonly reflector: Reflector) {
        super();
    }

	async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        
        if (isPublic) {
            return true;
        }
        
		// Detect if user is valid
        try {
			const allowed = await super.canActivate(context);
			return allowed === true;
		} catch (err) {
			// If not, throw the error
			throw err;
		}
    }

	handleRequest(err, user) {
		if (err || !user) {
			throw err || new UnauthorizedException();
		}
		return user;
	}
}
