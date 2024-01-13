import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserEntity } from "./user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(":username")
  @UseGuards(JwtAuthGuard) // JWT 토큰을 사용하여 인증하는 가드 추가
  findOneByUsername(@Param("username") username: string) {
    return this.usersService.findByUsername(username);
  }

  @Post() // HTTP POST 요청을 처리하는 데코레이터
  @UseGuards(JwtAuthGuard)
  create(@Body() createUser: UserEntity) {
    // 사용자를 생성하기 위한 DTO를 사용하여 UsersService에 요청
    return this.usersService.create(createUser);
  }
}
