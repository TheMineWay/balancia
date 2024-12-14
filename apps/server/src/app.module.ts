import { ENV } from "@constants/conf/env.constant";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { AuthModule } from "src/core/auth/auth.module";
import { UserModule } from "src/core/user/user.module";
import { DatabaseModule } from "src/database/database.module";
import { AuthGuard } from "src/guards/auth/auth.guard";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 1000,
        limit: ENV.rateLimit.maxRequestsPerMinute,
      },
    ]),
    JwtModule.register({
      global: true,
      secret: ENV.jwtSecret,
      signOptions: { expiresIn: ENV.jwtDuration },
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
