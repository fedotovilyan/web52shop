import { ApiError } from "@/shared/classes/ApiError";
import { UserService } from "../UserService/user.service";
import { AuthPayloadDTO } from "./dto/AuthPayload.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "../JwtService/jwt.service";
import { GenerateCookiesResponseDTO } from "./dto/GenerateCookiesResponse.dto";
import { Tokens } from "@/shared/types/Tokens";
import dayjs from "dayjs";
import { headers } from "next/headers";
import { IUser } from "@/shared/models/User";

export class AuthService {
	static async register({ email, password }: AuthPayloadDTO) {
		if (!email || !password)
			throw ApiError.BadRequestException("Отсутствует email или пароль!");

		const isEmailAvailable = !(await UserService.findUser({ email }));

		if (!isEmailAvailable)
			throw ApiError.BadRequestException("Введенный вами email уже занят!");

		const hash = await bcrypt.hash(
			password.toString(),
			Number(process.env.BCRYPT_SALT) || 10
		);

		return UserService.registerUser({ email, password: hash });
	}

	static async generateCookies({
		userId,
	}: {
		userId: IUser["id"];
	}): Promise<GenerateCookiesResponseDTO> {
		const { accessToken, refreshToken } = JwtService.generateTokens({
			userId,
		});

		const accessCookie = {
			name: Tokens.Access,
			value: accessToken,
			expires: dayjs()
				.add(+JwtService.JWT_ACCESS_EXPIRATION_TIME, "seconds")
				.toDate(),
		};

		const refreshCookie = {
			name: Tokens.Refresh,
			value: refreshToken,
			httpOnly: true,
			expires: dayjs()
				.add(+JwtService.JWT_REFRESH_EXPIRATION_TIME, "days")
				.toDate(),
		};

		return { accessCookie, refreshCookie };
	}

	static async login({ email, password }: AuthPayloadDTO) {
		if (!email || !password)
			throw ApiError.BadRequestException("Отсутствует email или пароль!");

		const user = await UserService.findUser({ email });
		const isPassMatch = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPassMatch) {
			throw ApiError.BadRequestException("Введен неверный email или пароль!");
		}

		return user;
	}

	static async verifyUser() {
		const headersApi = headers();
		const accessToken =
			headersApi.get("Authorization")?.split?.(" ")?.[1] || "";

		if (!accessToken)
			throw ApiError.UnauthorizedException("Вы не авторизованы");

		let userId = "";
		try {
			const decoded = JwtService.verifyToken(accessToken, Tokens.Access);
			userId = decoded.userId;
		} catch (e) {
			throw ApiError.UnauthorizedException("Вы не авторизованы");
		}
		return await UserService.findUser({ id: userId });
	}
}
