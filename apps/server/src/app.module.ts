import { ENV } from "@constants/conf/env.constant";
import { AuthModule } from "@core/api/auth/auth.module";
import { CoreModule } from "@core/core.module";
import { JwtAuthGuard } from "@core/guards/auth/jwt-auth.guard";
import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    DatabaseModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: ENV.rateLimit.maxRequestsPerMinute,
      },
    ]),
    AuthModule.register({
      clientId: ENV.oidc.clientId,
      clientSecret: ENV.oidc.clientSecret,
      host: ENV.oidc.host,
      issuerUrl: ENV.oidc.issuerUrl,
    }),
    CoreModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
