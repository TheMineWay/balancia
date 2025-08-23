import { input, number } from "@inquirer/prompts";
import * as fs from "fs";
import path from "path";

const generateFolderPath = path.join(__dirname, "..", "..", "..", "generated");

type DBServerProps = {
	port: number;
};

type DBComposeFileProps = DBServerProps & {
	password: string;
	connectionString: string;
	dbName: string;
};

const WARNING_MESSAGE =
	"# [!] This file is not uploaded to git so secret values can be safely stored in plain text";

const pgCompose = ({
	password,
	port,
	dbName,
	connectionString,
}: DBComposeFileProps) => {
	return `${WARNING_MESSAGE}
services:
  db:
    build: .
    restart: always
    environment:
      POSTGRES_PASSWORD: ${password}
      POSTGRES_USER: root
      POSTGRES_DB: ${dbName}
    ports:
      - ${port}:5432
    volumes:
      - ./data:/var/lib/postgresql/data
    command: >
      postgres -c ssl=on
               -c ssl_cert_file=/etc/postgresql/certs/server.crt
               -c ssl_key_file=/etc/postgresql/certs/server.key


# [I] Connection string
# ${connectionString}

# To generate DB certificates, run:
# - openssl req -new -x509 -days 365 -nodes -text -out server.crt -keyout server.key
# Put them inside a folder named "certs" next to the docker compose file.`;
};

const pgDockerfile = () => {
	return `FROM postgres:17.6

COPY certs/server.* /etc/postgresql/certs/
RUN chown postgres:postgres /etc/postgresql/certs/server.* \
    && chmod 600 /etc/postgresql/certs/server.key`;
};

export const generateDockerComposeDatabase = async () => {
	const defaultPort = 5432;
	const defaultPassword = "database_password";

	const password =
		(await input({
			message: "🔑 Database root password",
			default: defaultPassword,
		})) ?? defaultPassword;

	const defaultDbName = "nestflux-db";

	const dbName =
		(await input({
			message: "🧬 Database name",
			default: defaultDbName,
		})) ?? defaultDbName;

	const port =
		(await number({
			message: "Select port to run the database on",
			default: defaultPort,
			min: 1000,
			max: 24000,
		})) ?? defaultPort;

	const connectionString = generateConnectionString({
		host: "127.0.0.1",
		port,
		database: dbName,
		user: "root",
		password,
	});
	const composeContent = pgCompose({
		port,
		password,
		dbName,
		connectionString,
	});
	const dockerfileContent = pgDockerfile();

	if (!fs.existsSync(generateFolderPath)) fs.mkdirSync(generateFolderPath);
	if (!fs.existsSync(path.join(generateFolderPath, "database")))
		fs.mkdirSync(path.join(generateFolderPath, "database"));

	if (!fs.existsSync(path.join(generateFolderPath, "database", "postgres")))
		fs.mkdirSync(path.join(generateFolderPath, "database", "postgres"));

	fs.writeFileSync(
		path.join(generateFolderPath, "database", "postgres", `docker-compose.yml`),
		composeContent,
		"utf-8",
	);

	fs.writeFileSync(
		path.join(generateFolderPath, "database", "postgres", `Dockerfile`),
		dockerfileContent,
		"utf-8",
	);

	console.log(`❇️ Connection string: ${connectionString}`);
};

interface DBConnectionOptions {
	host: string;
	port: number;
	database: string;
	user: string;
	password: string;
}

function generateConnectionString(options: DBConnectionOptions): string {
	const { host, port, database, user, password } = options;

	const connectionString = `postgres://${user}:${password}@${host}:${port}/${database}`;

	return connectionString;
}
