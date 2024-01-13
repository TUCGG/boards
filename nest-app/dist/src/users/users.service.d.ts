import { Repository } from "typeorm";
import { UserEntity } from "./user.entity";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<UserEntity>);
    findByUsername(username: string): Promise<UserEntity | undefined>;
    create(createUser: UserEntity): Promise<UserEntity>;
}
