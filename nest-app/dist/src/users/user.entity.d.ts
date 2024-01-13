import { BoardEntity } from "src/boards/entities/board.entity";
export declare class UserEntity {
    id: number;
    name: string;
    username: string;
    password: string;
    boards: BoardEntity[];
}
