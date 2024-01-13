import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { BoardsService } from "./boards.service";
import { BoardEntity } from "./entities/board.entity";
import { BoardType } from "./board.module";

@Controller("boards")
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get()
  async getAllBoard(): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoards();
  }

  @Get("/byType/:type")
  async getAllBoards(@Param("type") type: BoardType): Promise<BoardEntity[]> {
    return this.boardsService.getAllBoardsByType(type);
  }

  @Post()
  async createBoard(@Body() board: BoardEntity): Promise<BoardEntity> {
    return await this.boardsService.createBoard(board);
  }

  @Get("/search")
  async searchBoards(
    @Query("type") type: string,
    @Query("contents") contents: string,
    @Query("activeTab") activeTab: BoardType,
    @Query("isShow") isShow: string,
    @Query("startDate") startDate: string,
    @Query("endDate") endDate: string,
    @Query("start") start?: number,
    @Query("limit") limit?: number
  ): Promise<{ total_count: number; items: BoardEntity[] }> {
    const searchResults = await this.boardsService.searchBoards(
      type,
      contents,
      activeTab,
      isShow,
      startDate,
      endDate,
      start,
      limit
    );
    return searchResults;
  }

  @Get("/:id")
  async getBoardById(@Param("id") id: number): Promise<BoardEntity> {
    return this.boardsService.getBoardById(id);
  }

  @Get("/near/:id")
  async getNearBoardById(@Param("id") id: number): Promise<{
    previousBoard: BoardEntity | null;
    nextBoard: BoardEntity | null;
  }> {
    return this.boardsService.getNearBoardById(id);
  }

  @Delete("/:id")
  async deleteBoard(@Param("id") id: number): Promise<BoardEntity[]> {
    return this.boardsService.deleteBoard(id);
  }

  @Patch("/:id")
  async updateBoardStatus(
    @Param("id") id: number,
    @Body() updatedBoardData: BoardEntity
  ): Promise<BoardEntity> {
    return this.boardsService.updateBoardStatus(id, updatedBoardData);
  }
}
