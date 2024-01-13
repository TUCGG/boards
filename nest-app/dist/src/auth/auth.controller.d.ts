import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login({ username, password }: {
        username: any;
        password: any;
    }): Promise<{
        success: boolean;
        token: string;
        user: any;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        token?: undefined;
        user?: undefined;
    }>;
    verifyToken(): Promise<{
        success: boolean;
    }>;
}
