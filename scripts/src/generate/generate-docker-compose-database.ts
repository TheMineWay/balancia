import { input, number, select } from "@inquirer/prompts";
import * as fs from "fs";
import path from "path";

const generateFolderPath = path.join(__dirname, "..", "..", "..", "generated");

type DBServerProps = {
	dialect: string;
	port: number;
};

type DBComposeFileProps = DBServerProps & {
	password: string;
	connectionString: string;
	dbName: string;
};

const DB_SERVERS = [
	{
		dialect: "PostgreSQL",
		port: 5432,
	},
] as const satisfies Array<DBServerProps>;

const WARNING_MESSAGE =
	"# [!] This file is not uploaded to git so secret values can be safely stored in plain text";

const pg = ({
	password,
	port,
	dbName,
	connectionString,
}: DBComposeFileProps) => {
	return `${WARNING_MESSAGE}
services:
  db:
    image: postgres:17.6
    restart: always
    shm_size: 128mb
    environment:
      POSTGRES_PASSWORD: ${password}
      POSTGRES_USER: api_user
      POSTGRES_DB: ${dbName}
    ports:
      - ${port}:5432
    volumes:
      - ./data:/var/lib/postgresql/data

# [I] Connection string
# ${connectionString}`;
};

const COMPOSE_FILES: Record<
	(typeof DB_SERVERS)[number]["dialect"],
	(props: DBComposeFileProps) => string
> = {
	PostgreSQL: pg,
};

export const generateDockerComposeDatabase = async () => {
	const dialect: keyof typeof COMPOSE_FILES = await select({
		message: "Pick a DB dialect",
		choices: Object.keys(COMPOSE_FILES),
	});

	const defaultPort =
		DB_SERVERS.find((d) => d.dialect === dialect)?.port ?? 3306;

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
	const composeContent = COMPOSE_FILES[dialect]({
		port,
		dialect,
		password,
		dbName,
		connectionString,
	});

	if (!fs.existsSync(generateFolderPath)) fs.mkdirSync(generateFolderPath);
	if (!fs.existsSync(path.join(generateFolderPath, "database")))
		fs.mkdirSync(path.join(generateFolderPath, "database"));

	if (!fs.existsSync(path.join(generateFolderPath, "database", "postgres")))
		fs.mkdirSync(path.join(generateFolderPath, "database", "postgres"));

	fs.writeFileSync(
		path.join(
			generateFolderPath,
			"database",
			"postgres",
			`db.${dialect.toLowerCase()}.docker-compose.yml`,
		),
		composeContent,
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
