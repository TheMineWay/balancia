import { ENV } from "@constants/conf/env.constant";
import { configurationGuard } from "@core/__lib__/configuration/configuration-guard.util";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as pkg from "@pkg";
import * as fs from "fs";
import helmet from "helmet";
import { AppModule } from "./app.module";

/**
 * Retrieves HTTPS options for the server if HTTPS is enabled in configuration.
 * Reads SSL certificate and key files from the certificates directory.
 */
const getHttpsOptions = () => {
	if (ENV.requests.useHttps) {
		return {
			key: fs.readFileSync("./certificates/key.pem"),
			cert: fs.readFileSync("./certificates/cert.pem"),
		};
	}

	return undefined;
};

/**
 * Bootstrap function that initializes and configures the NestJS application.
 * Sets up HTTPS, CORS, security middleware, request parsing, and API documentation.
 */
async function bootstrap() {
	if (ENV.configurationGuard) configurationGuard();
	else if (ENV.env === "production") {
		Logger.warn("Configuration guard is disabled in production", "Bootstrap");
	}

	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		httpsOptions: getHttpsOptions(),
	});

	// Set timeout
	const server = app.getHttpServer();
	server.setTimeout(ENV.requests.requestTimeout);

	// Enable CORS
	app.enableCors({
		origin: ENV.cors.allowedDomains[0] === "*" ? "*" : ENV.cors.allowedDomains,
	});

	// Use Helmet
	app.use(helmet());

	// Limit request sizes
	app.useBodyParser("json", { limit: ENV.requests.maxRequestBodySize });
	app.useBodyParser("urlencoded", {
		limit: ENV.requests.maxRequestQuerySize,
		extended: true,
	});

	// Documentation
	if (ENV.docs.openApiDocs) {
		const config = new DocumentBuilder()
			.setTitle(pkg?.name)
			.setVersion(pkg?.version)
			.addBearerAuth()
			.build();
		const documentFactory = () => SwaggerModule.createDocument(app, config);
		SwaggerModule.setup("documentation", app, documentFactory);
	}

	await app.listen(process.env.PORT || 3001, "0.0.0.0");
}
bootstrap();
