import { ApiError } from "@/shared/classes/ApiError";
import { UserService } from "../UserService/user.service";
import { AuthPayloadDTO } from "./dto/AuthPayload.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "../JwtService/jwt.service";
import { GenerateCookiesResponseDTO } from "./dto/GenerateCookiesResponse.dto";
import { Tokens } from "@/shared/types/Tokens";
import dayjs from "dayjs";

export class AuthService {
	static async register({ phone, password }: AuthPayloadDTO) {
		if (!phone || !password)
			throw ApiError.BadRequestException("Отсутствует телефон или пароль!");

		const isPhoneAvailable = !(await UserService.getUserByPhone(phone));

		if (!isPhoneAvailable)
			throw ApiError.BadRequestException("Введенный вами телефон уже занят!");

		const hash = await bcrypt.hash(
			password.toString(),
			Number(process.env.BCRYPT_SALT) || 10
		);

		return UserService.registerUser({ phone, password: hash });
	}

	static generateCookies({
		phone,
	}: {
		phone: AuthPayloadDTO["phone"];
	}): GenerateCookiesResponseDTO {
		const { accessToken, refreshToken } = JwtService.generateTokens({ phone });

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

	static async login({ phone, password }: AuthPayloadDTO) {
		if (!phone || !password)
			throw ApiError.BadRequestException("Отсутствует телефон или пароль!");

		const user = await UserService.getUserByPhone(phone);
		const isPassMatch = await bcrypt.compare(password, user?.password || "");

		if (!user || !isPassMatch) {
			throw ApiError.BadRequestException("Введен неверный телефон или пароль!");
		}

		return { phone };
	}
}
