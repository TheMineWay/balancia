import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import pkg from "@pkg";
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

  // Documentation
  const config = new DocumentBuilder()
    .setTitle(pkg?.name ?? "NestFlux")
    .setVersion(pkg?.version ?? "1.0.0")
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("documentation", app, documentFactory);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
