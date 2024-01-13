import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
export declare class AuthService {
    private readonly usersService;
    private readonly jwtService;
    private invalidatedTokens;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<any | null>;
    generateToken(user: any): string;
    invalidateToken(user: any): string;
    validateToken(token: string): Promise<any | null>;
}
