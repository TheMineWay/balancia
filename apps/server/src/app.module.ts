import { ENV } from "@constants/conf/env.constant";
import { AuthModule } from "@core/api/auth/auth.module";
import { CachesModule } from "@core/cache/caches.module";
import { CoreModule } from "@core/core.module";
import { JwtAuthGuard } from "@core/guards/auth/jwt-auth.guard";
import { PermissionsGuard } from "@core/guards/permissions/permission.guard";
import { DatabaseModule } from "@database/database.module";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ScheduleModule } from "@nestjs/schedule";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { EventModule } from "src/events/event.module";
import { IntegrationModule } from "src/integrations/integration.module";

@Module({
  imports: [
    EventModule,
    DatabaseModule,
    CachesModule,
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
    ScheduleModule.forRoot(),
    IntegrationModule,
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
    {
      provide: APP_GUARD,
      useClass: PermissionsGuard,
    },
  ],
})
export class AppModule {}
