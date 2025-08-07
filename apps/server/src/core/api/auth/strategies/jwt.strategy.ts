// src/auth/jwt.strategy.ts
import { AuthService } from "@core/api/auth/auth.service";
import { UserService } from "@core/api/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { JwtToken, OpenIdConfig } from "@shared/models";
import * as jwksRsa from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

export const JWT_STRATEGY = "JWT_STRATEGY";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		openIdConfig: OpenIdConfig,
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			//audience: 'your-audience', // optional
			issuer: openIdConfig.issuer,
			algorithms: openIdConfig.id_token_signing_alg_values_supported,
			secretOrKeyProvider: jwksRsa.passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: openIdConfig.jwks_uri,
			}),
		});
	}

	async validate(payload: JwtToken) {
		const user = await this.userService.getByCode(payload.sub);

		if (!user) throw new BadRequestException();
		const permissionInfo = await this.authService.getUserAuthInfo(user.id);

		return { payload, user, permissionInfo };
	}
}

export type JwtRequestUserInfo = Awaited<ReturnType<JwtStrategy["validate"]>>;
