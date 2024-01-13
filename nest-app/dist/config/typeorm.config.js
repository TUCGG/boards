"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
console.log('process.env.MYSQLDB_HOST', process.env.MYSQLDB_HOST);
exports.typeOrmConfig = {
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
//# sourceMappingURL=typeorm.config.js.map