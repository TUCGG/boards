import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { BoardType } from "../board.module";
import { UserEntity } from "src/users/user.entity";

// name에 테이블 명이 들어가야함
export class ImageInfo {
  filename: string;
  url: string;
}

@Entity({ name: "boards" })
export class BoardEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title" })
  title: string;

  @Column({ name: "description" })
  description: string;

  @Column({ name: "url" })
  url: string;

  @Column({ name: "contents", type: "longtext" })
  contents: string;

  @Column({ name: "create_at", type: "timestamp" })
  createAt: Date;

  @Column({ name: "update_at", type: "timestamp" })
  updateAt: Date;

  @Column({ name: "type" })
  type: BoardType;

  @Column({ name: "show_flag" })
  isShow: boolean;

  @Column({ name: "thumb", type: "json" })
  thumb: ImageInfo;

  @Column({ name: "img_arr", type: "json", nullable: true })
  contentImage: ImageInfo;

  @ManyToOne(() => UserEntity, (user) => user.boards)
  @JoinColumn({ name: "user_id" })
  user: UserEntity;
}
