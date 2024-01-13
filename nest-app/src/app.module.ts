import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "config/typeorm.config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { BoardsModule } from "./boards/boards.module";
import { BoardEntity } from "./boards/entities/board.entity";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./users/user.entity";

@Module({
  imports: [
    BoardsModule,
    TypeOrmModule.forFeature([BoardEntity, UserEntity]),
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
