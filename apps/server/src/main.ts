import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import helmet from "helmet";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors();

  // Enable validation
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  // Use Helmet
  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
