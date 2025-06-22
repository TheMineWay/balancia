// src/auth/jwt.strategy.ts
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { OpenIdConfig } from "@shared/models";
import * as jwksRsa from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";

export const JWT_STRATEGY = "JWT_STRATEGY";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(openIdConfig: OpenIdConfig) {
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

  async validate(payload: any) {
    // This is the decoded JWT payload
    return payload;
  }
}
