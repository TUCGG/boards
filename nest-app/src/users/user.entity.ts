import { BoardEntity } from "src/boards/entities/board.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "name" })
  name: string;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "password" })
  password: string;

  @OneToMany(() => BoardEntity, (board) => board.user)
  boards: BoardEntity[];
}
