"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(cors({
        origin: `${process.env.NEXT_PUBLIC_SERVER_HOST}`,
        credentials: true,
    }));
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map