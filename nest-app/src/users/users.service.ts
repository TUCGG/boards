import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
import { CreateUserDto } from "./dto/create-user-dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(createUser: UserEntity): Promise<UserEntity> {
    const user = this.userRepository.create(createUser);
    return this.userRepository.save(user);
  }
}
