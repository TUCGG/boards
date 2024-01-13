import { BoardType } from "../board.module";
import { UserEntity } from "src/users/user.entity";
export declare class ImageInfo {
    filename: string;
    url: string;
}
export declare class BoardEntity {
    id: number;
    title: string;
    description: string;
    url: string;
    contents: string;
    createAt: Date;
    updateAt: Date;
    type: BoardType;
    isShow: boolean;
    thumb: ImageInfo;
    contentImage: ImageInfo;
    user: UserEntity;
}
