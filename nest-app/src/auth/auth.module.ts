import { Module } from "@nestjs/common";
import { ConfigModule } from '@nestjs/config';
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: "yourSecretKey", // 시크릿 키 설정
      signOptions: { expiresIn: "1d" }, // 토큰 만료 시간 설정
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
