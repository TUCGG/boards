import { BoardsService } from "./boards.service";
import { BoardEntity } from "./entities/board.entity";
import { BoardType } from "./board.module";
export declare class BoardsController {
    private boardsService;
    constructor(boardsService: BoardsService);
    getAllBoard(): Promise<BoardEntity[]>;
    getAllBoards(type: BoardType): Promise<BoardEntity[]>;
    createBoard(board: BoardEntity): Promise<BoardEntity>;
    searchBoards(type: string, contents: string, activeTab: BoardType, isShow: string, startDate: string, endDate: string, start?: number, limit?: number): Promise<{
        total_count: number;
        items: BoardEntity[];
    }>;
    getBoardById(id: number): Promise<BoardEntity>;
    getNearBoardById(id: number): Promise<{
        previousBoard: BoardEntity | null;
        nextBoard: BoardEntity | null;
    }>;
    deleteBoard(id: number): Promise<BoardEntity[]>;
    updateBoardStatus(id: number, updatedBoardData: BoardEntity): Promise<BoardEntity>;
}
