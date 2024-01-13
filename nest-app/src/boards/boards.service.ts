import { Injectable, NotFoundException } from "@nestjs/common";
import { BoardEntity } from "./entities/board.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, In, Like, Repository } from "typeorm";
import { BoardType } from "./board.module";

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,
  ) {}

  async createBoard(board: BoardEntity): Promise<BoardEntity> {
    const newBoard = this.boardsRepository.create(board);
    return await this.boardsRepository.save(newBoard);
  }

  async getAllBoards(): Promise<BoardEntity[]> {
    const boards = await this.boardsRepository.find({
      relations: ["user"],
      order: {
        createAt: "ASC", // createAt 기준으로 내림차순 정렬
      },
    });

    // 사용자 객체에서 password를 null로 처리
    boards.forEach((board) => {
      if (board.user) {
        board.user.password = "";
        board.user.id = null;
      }
    });

    return boards;
  }
  async getAllBoardsByType(type: BoardType): Promise<BoardEntity[]> {
    const boards = await this.boardsRepository.find({
      relations: ["user"],
      where: { type },
      order: {
        isShow: 1, // isShow가 true인 것을 먼저 정렬 (내림차순)
        createAt: "DESC", // createdAt을 기준으로 날짜 내림차순 정렬
      }, // 타입에 해당하는 게시물만 필터링
    });

    // 사용자 객체에서 password를 null로 처리
    boards.forEach((board) => {
      if (board.user) {
        board.user.password = "";
        board.user.id = null;
      }
    });

    return boards;
  }

  async getBoardById(id: number): Promise<BoardEntity> {
    const board = await this.boardsRepository.findOne({
      where: {
        id,
      },
      relations: ["user"],
    });

    if (!board) {
      return null;
    }

    board.user.password = "";
    board.user.id = null;

    return board;
  }

  async getNearBoardById(id: number): Promise<{
    previousBoard: BoardEntity | null;
    nextBoard: BoardEntity | null;
  }> {
    const allBoards = await this.boardsRepository.find({
      relations: ["user"],
      where: { isShow: true },
      order: {
        createAt: "ASC",
      },
    });

    const currentIndex = allBoards.findIndex(
      (board) => board.id === Number(id),
    );

    if (currentIndex === -1) {
      return { previousBoard: null, nextBoard: null };
    }

    const previousIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const previousBoard = previousIndex >= 0 ? allBoards[previousIndex] : null;
    const currentBoard = allBoards[currentIndex];
    const nextBoard =
      nextIndex < allBoards.length ? allBoards[nextIndex] : null;

    if (previousBoard && previousBoard.user) {
      previousBoard.user.password = "";
      previousBoard.user.id = null;
    }

    if (currentBoard.user) {
      currentBoard.user.password = "";
      currentBoard.user.id = null;
    }

    if (nextBoard && nextBoard.user) {
      nextBoard.user.password = "";
      nextBoard.user.id = null;
    }
    return { previousBoard, nextBoard };
  }

  async deleteBoard(id: number): Promise<BoardEntity[]> {
    const boardToDelete = await this.boardsRepository.findOne({
      where: {
        id,
      },
    });
    if (!boardToDelete) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }
    const idxToDelete = boardToDelete.id;

    await this.boardsRepository.delete(idxToDelete);
    return this.boardsRepository.find();
  }

  async updateBoardStatus(
    id: number,
    updatedBoardData: BoardEntity,
  ): Promise<BoardEntity> {
    const existingBoard = await this.boardsRepository.findOne({
      where: { id },
    });

    if (!existingBoard) {
      throw new NotFoundException(`게시글 ID ${id}를 찾을 수 없습니다.`);
    }

    // 업데이트된 데이터로 기존 게시글을 업데이트합니다.
    Object.assign(existingBoard, updatedBoardData);

    // 업데이트된 게시글을 저장하고 반환합니다.
    return await this.boardsRepository.save(existingBoard);
  }

  async searchBoards(
    type: string,
    contents: string,
    activeTab: BoardType,
    isShow: string,
    startDate: string,
    endDate: string,
    start?: number,
    limit?: number,
  ): Promise<{
    total_count: number;
    items: BoardEntity[];
  }> {
    let searchResults: BoardEntity[];

    const findObj: FindManyOptions = {
      relations: ["user"],
      where: {},
      order: {
        createAt: "DESC",
      },
    };

    if (isShow) {
      findObj.where["isShow"] = isShow === "true" ? 1 : 0;
    }

    if (activeTab) {
      findObj.where["type"] = activeTab;
    }

    if (startDate && endDate) {
      findObj.where["createAt"] = Between(
        new Date(startDate),
        new Date(endDate),
      );
    }

    if (start) {
      findObj["skip"] = start;
    }

    if (limit) {
      findObj["take"] = limit;
    }

    if (type === "title") {
      findObj.where["title"] = Like(`%${contents}%`);
    } else if (type === "contents") {
      findObj.where["contents"] = Like(`%${contents}%`);
    } else {
      findObj.where = [
        { ...findObj.where, title: Like(`%${contents}%`) },
        { ...findObj.where, contents: Like(`%${contents}%`) },
      ];
    }

    const total = await this.boardsRepository.count(findObj);
    searchResults = await this.boardsRepository.find(findObj);

    return {
      total_count: total,
      items: searchResults,
    };
  }
}
