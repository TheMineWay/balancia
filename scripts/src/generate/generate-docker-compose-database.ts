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
    dialect: "MySQL",
    port: 3306,
  },
] as const satisfies Array<DBServerProps>;

const WARNING_MESSAGE =
  "# [!] This file is not uploaded to git so secret values can be safely stored in plain text";

const mySql = ({
  password,
  port,
  dbName,
  connectionString,
}: DBComposeFileProps) => {
  return `${WARNING_MESSAGE}
services:
    db-mysql:
        image: mysql
        #restart: always # Not recommended for development mode
        environment:
            MYSQL_DATABASE: "${dbName}"
            MYSQL_ROOT_PASSWORD: "${password}"
            #MYSQL_USER: api_user # Creates another user (independent from the root user)
            #MYSQL_PASSWORD: api_user_password # Sets the password for the user defined in (MYSQL_USER)
        ports:
            - "${port}:3306"  # Custom port mapping (host:container)
        volumes:
            - mysql_data:/var/lib/mysql

volumes:
  mysql_data:

# [I] Connection string
# ${connectionString}`;
};

const COMPOSE_FILES: Record<
  (typeof DB_SERVERS)[number]["dialect"],
  (props: DBComposeFileProps) => string
> = {
  MySQL: mySql,
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

  fs.writeFileSync(
    path.join(
      generateFolderPath,
      "database",
      `db.${dialect.toLowerCase()}.docker-compose.yml`
    ),
    composeContent,
    "utf-8"
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

  const connectionString = `mysql://${user}:${password}@${host}:${port}/${database}`;

  return connectionString;
}
