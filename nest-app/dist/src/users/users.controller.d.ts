import { UsersService } from "./users.service";
import { UserEntity } from "./user.entity";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOneByUsername(username: string): Promise<UserEntity>;
    create(createUser: UserEntity): Promise<UserEntity>;
}
