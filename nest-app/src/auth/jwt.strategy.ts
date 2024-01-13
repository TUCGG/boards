import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "yourSecretKey", // AuthService에서 사용한 것과 동일한 시크릿 키
    });
  }

  async validate(payload: any) {
    // 토큰에서 추출한 정보를 사용하여 사용자를 찾거나 추가적인 검증을 수행할 수 있습니다.
    return { userId: payload.sub, username: payload.username };
  }
}
