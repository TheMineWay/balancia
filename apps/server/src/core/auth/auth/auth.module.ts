import { AuthController } from "@core/auth/auth/auth.controller";
import { AuthService } from "@core/auth/auth/auth.service";
import { AuthRepository } from "@core/auth/auth/repositories/auth.repository";
import {
	JWT_STRATEGY,
	JwtStrategy,
} from "@core/auth/auth/strategies/jwt.strategy";
import { UserService } from "@core/auth/user/user.service";
import { DynamicModule, Global, Logger, Module } from "@nestjs/common";

export const OPENID_CONFIG = "OPENID_CONFIG";

type RegisterOptions = {
	clientId: string;
	clientSecret: string;
	host: string;
	issuerUrl: string;
};

@Global()
@Module({})
// biome-ignore lint/complexity/noStaticOnlyClass: AuthModule is a static-only class
export class AuthModule {
	static async register(options: RegisterOptions): Promise<DynamicModule> {
		// Setup the OIDC client configuration
		const config = await AuthService.getOpenIdConfiguration(options.issuerUrl);

		Logger.log("Configuration discovered", "OpenID");

		return {
			providers: [
				AuthService,
				AuthRepository,
				// Expose strategy
				{
					provide: JWT_STRATEGY,
					useFactory: (userService: UserService, authService: AuthService) => {
						return new JwtStrategy(config, userService, authService);
					},
					inject: [UserService, AuthService],
				},
				// Expose OpenID config
				{
					provide: OPENID_CONFIG,
					useValue: config,
				},
			],
			controllers: [AuthController],
			exports: [AuthService, OPENID_CONFIG],
			module: AuthModule,
			global: true,
		};
	}
}
