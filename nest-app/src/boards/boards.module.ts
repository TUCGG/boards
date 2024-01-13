import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardsController } from "./boards.controller";
import { BoardsService } from "./boards.service";
import { BoardEntity } from "./entities/board.entity";

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  controllers: [BoardsController],
  providers: [BoardsService],
})
export class BoardsModule {}
