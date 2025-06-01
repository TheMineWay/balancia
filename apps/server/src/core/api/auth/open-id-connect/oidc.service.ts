import { ENV } from "@constants/conf/env.constant";
import { OIDC_CONFIG_PROVIDER } from "@core/api/auth/strategies/oidc.strategy";
import { Inject, Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import * as client from "openid-client";
import * as qs from "qs";

const OIDC_SERVER_URL = ENV.oidc.host;
const OIDC_GET_TOKEN_URL = `${OIDC_SERVER_URL}/application/o/token`;

@Injectable()
export class OidcService {
  constructor(
    @Inject(OIDC_CONFIG_PROVIDER)
    private readonly oidcClient: client.Configuration,
  ) {}

  async getTokenFromCode(code: string): Promise<string> {
    const serverMetadata = this.oidcClient.serverMetadata();

    const values = {
      client_id: ENV.oidc.clientId,
      client_secret: ENV.oidc.clientSecret,
      code,
      grant_type:
        serverMetadata.grant_types_supported?.[0] ?? "authorization_code",
      redirect_uri: "http://localhost:3000/_callback/auth", // TODO: Make this dynamic
    };

    const data: string = qs.stringify(values);
    const response = await axios.request<{ token: string }>({
      url: OIDC_GET_TOKEN_URL,
      method: "post",
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
    Logger.log(response.data, "OidcService");
    return "JWT";
  }
}
