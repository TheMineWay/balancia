import { ENV } from "@constants/conf/env.constant";
import { Injectable, Logger } from "@nestjs/common";
import axios from "axios";
import qs from "qs";

const OIDC_SERVER_URL = ENV.oidc.host;
const OIDC_GTE_TOKEN_URL = `${OIDC_SERVER_URL}/token`;

@Injectable()
export class OidcService {
  async getTokenFromCode(code: string): Promise<string> {
    const values = {
      client_id: ENV.oidc.clientId,
      client_secret: ENV.oidc.clientSecret,
      code,
      grant_type: ENV.oidc.grantType,
      redirect_uri: ENV.oidc.redirectUri,
    };

    const data: string = qs.stringify(values);
    const response = await axios.post<{ token: string }>(OIDC_GTE_TOKEN_URL, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data,
    });
    Logger.log(response.data, "OidcService");
    return "JWT";
  }
}
