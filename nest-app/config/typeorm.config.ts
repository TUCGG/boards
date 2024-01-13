import { TypeOrmModuleOptions } from "@nestjs/typeorm";


console.log('process.env.MYSQLDB_HOST',process.env.MYSQLDB_HOST)
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.MYSQLDB_HOST,
  port: parseInt(process.env.MYSQLDB_DOCKER_PORT, 10),
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  synchronize: true,
  logging: true,
  entities: ["dist/**/*.entity{.ts,.js}"],
  timezone: "Asia/Seoul",
  charset: "utf8mb4",
};
