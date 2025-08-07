import { AuthController } from "@core/api/auth/auth.controller";
import { AuthService } from "@core/api/auth/auth.service";
import {
	JWT_STRATEGY,
	JwtStrategy,
} from "@core/api/auth/strategies/jwt.strategy";
import { UserService } from "@core/api/user/user.service";
import { AuthRepository } from "@database/repository/core/auth/auth.repository";
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
