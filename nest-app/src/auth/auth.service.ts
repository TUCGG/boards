import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  private invalidatedTokens: Set<string> = new Set();

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any | null> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === password) {
      return user;
    }
    return null; // 사용자가 존재하지 않거나 패스워드가 일치하지 않으면 null 반환
  }

  generateToken(user: any): string {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  invalidateToken(user: any): string {
    // 토큰 무효화를 위해 사용자에 대한 특정 작업 수행
    // 여기에서는 사용자 ID를 기반으로 토큰을 생성하고 무효화합니다.
    const invalidatedToken = this.jwtService.sign({ sub: user.id });

    // 무효화된 토큰을 저장 (실제로는 데이터베이스나 다른 저장소에 저장)
    this.invalidatedTokens.add(invalidatedToken);

    return invalidatedToken;
  }

  async validateToken(token: string): Promise<any | null> {
    if (this.invalidatedTokens.has(token)) {
      throw new UnauthorizedException("Invalid token");
    }
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
