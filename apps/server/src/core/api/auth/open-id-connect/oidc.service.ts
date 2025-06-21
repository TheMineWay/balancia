import { OIDC_CONFIG_PROVIDER } from "@core/api/auth/strategies/oidc.strategy";
import { Inject, Injectable } from "@nestjs/common";
import * as client from "openid-client";

@Injectable()
export class OidcService {
  constructor(
    @Inject(OIDC_CONFIG_PROVIDER)
    public readonly oidcClient: client.Configuration,
  ) {}
}
