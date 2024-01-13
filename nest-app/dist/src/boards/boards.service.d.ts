import { BoardEntity } from "./entities/board.entity";
import { Repository } from "typeorm";
import { BoardType } from "./board.module";
export declare class BoardsService {
    private boardsRepository;
    constructor(boardsRepository: Repository<BoardEntity>);
    createBoard(board: BoardEntity): Promise<BoardEntity>;
    getAllBoards(): Promise<BoardEntity[]>;
    getAllBoardsByType(type: BoardType): Promise<BoardEntity[]>;
    getBoardById(id: number): Promise<BoardEntity>;
    getNearBoardById(id: number): Promise<{
        previousBoard: BoardEntity | null;
        nextBoard: BoardEntity | null;
    }>;
    deleteBoard(id: number): Promise<BoardEntity[]>;
    updateBoardStatus(id: number, updatedBoardData: BoardEntity): Promise<BoardEntity>;
    searchBoards(type: string, contents: string, activeTab: BoardType, isShow: string, startDate: string, endDate: string, start?: number, limit?: number): Promise<{
        total_count: number;
        items: BoardEntity[];
    }>;
}
