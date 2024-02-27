import jwt from "jsonwebtoken";
import { JwtGenerateTokensPayload } from "./dto/JwtGenerateTokensPayload.dto";
import { Tokens } from "@/shared/types/Tokens";
import { VerifyTokenResponse } from "./dto/VerifyTokenResponse.dto";

export class JwtService {
	static JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "";
	static JWT_ACCESS_EXPIRATION_TIME = process.env.JWT_ACCESS_EXPIRATION_TIME || "0";

	static JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "";
	static JWT_REFRESH_EXPIRATION_TIME = process.env.JWT_REFRESH_EXPIRATION_TIME || "0";

	static generateTokens(payload: JwtGenerateTokensPayload) {
		const accessToken = jwt.sign(payload, this.JWT_ACCESS_SECRET, {
			expiresIn: `${this.JWT_ACCESS_EXPIRATION_TIME}s`,
		});

		const refreshToken = jwt.sign(payload, this.JWT_REFRESH_SECRET, {
			expiresIn: `${this.JWT_REFRESH_EXPIRATION_TIME}d`,
		});

		return { accessToken, refreshToken };
	}

	static verifyToken(token: string, type: Tokens): VerifyTokenResponse {
		const secret = type === Tokens.Access ? this.JWT_ACCESS_SECRET : this.JWT_REFRESH_SECRET;

		return jwt.verify(token, secret) as VerifyTokenResponse;
	}
}
