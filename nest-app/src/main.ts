import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // CORS 미들웨어 활성화

  app.use(
    cors({
      // origin: `http://localhost:${process.env.NEXT_PUBLIC_APP_LOCAL_PORT}`, // 허용할 프론트엔드 애플리케이션의 주소입니다
      origin: `${process.env.NEXT_PUBLIC_SERVER_HOST}`, // 허용할 프론트엔드 애플리케이션의 주소입니다
      credentials: true, // 인증 정보(쿠키 등)를 전달할 때 true로 설정
    }),
  );

  await app.listen(3001);
}

bootstrap();
