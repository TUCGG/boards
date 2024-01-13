import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() { username, password }) {
    const _user = await this.authService.validateUser(username, password);
    const user = { ..._user, password: "" };

    if (user) {
      const token = this.authService.generateToken(user);
      return { success: true, token, user };
    } else {
      return { success: false, message: "Invalid username or password" };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get("verify-token")
  async verifyToken() {
    return { success: true };
  }
}
