import { AuthController } from "@core/api/auth/auth.controller";
import { AuthService } from "@core/api/auth/auth.service";
import { OidcModule } from "@core/api/auth/open-id-connect/oidc.module";
import { OIDC_CONFIG_PROVIDER } from "@core/api/auth/strategies/oidc.strategy";
import { DynamicModule, Global, Logger, Module } from "@nestjs/common";
import * as client from "openid-client";

type RegisterOptions = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  grantType: string;
  host: string;
  emitterUrl: string;
};

@Global()
@Module({})
export class AuthModule {
  static async register(options: RegisterOptions): Promise<DynamicModule> {
    // Setup the OIDC client configuration
    const config: client.Configuration = await client.discovery(
      new URL(options.emitterUrl),
      options.clientId,
      options.clientSecret,
    );

    Logger.log("Configuration discovered", "OIDC");

    return {
      providers: [
        AuthService,
        {
          provide: OIDC_CONFIG_PROVIDER,
          useValue: config,
        },
      ],
      controllers: [AuthController],
      exports: [AuthService, OIDC_CONFIG_PROVIDER],
      imports: [OidcModule],
      module: AuthModule,
      global: true,
    };
  }
}
