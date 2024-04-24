import { ApiError } from "@/shared/classes/ApiError";
import { UserService } from "../UserService/user.service";
import { AuthPayloadDTO } from "./dto/AuthPayload.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "../JwtService/jwt.service";
import { GenerateCookiesResponseDTO } from "./dto/GenerateCookiesResponse.dto";
import { Tokens } from "@/shared/types/Tokens";
import dayjs from "dayjs";
import { cookies, headers } from "next/headers";
import { IUser, UserRole } from "@/shared/models/User";
import { VerifyUserByRefreshTokenResponseDTO } from "./dto/VerifyUserByRefreshTokenResponse.dto";

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
		accessToken,
		refreshToken,
	}: {
		accessToken: string;
		refreshToken: string;
	}): Promise<GenerateCookiesResponseDTO> {
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
		console.log(await bcrypt.hash("fds", 10));

		if (!user || !isPassMatch) {
			throw ApiError.BadRequestException("Введен неверный email или пароль!");
		}

		return user;
	}

	static async verifyUserByRefreshToken(): Promise<VerifyUserByRefreshTokenResponseDTO> {
		let response: VerifyUserByRefreshTokenResponseDTO = { status: 401 };
		const refreshToken = cookies().get(Tokens.Refresh)?.value || "";

		let userId = '';
		try {
			const decoded = JwtService.verifyToken(refreshToken, Tokens.Refresh);
			userId = decoded.userId;
		} catch {
			return { status: 401 };
		}

		try {
			const userResponse = await UserService.findUser({ id: userId });
			if (!userResponse) {
				return { status: 401 };
			}
			const user = { ...userResponse, password: undefined };

			response = {
				status: 200,
				user: {
					...user,
					role: user.role as UserRole,
					createdAt: user.createdAt.toISOString(),
					updatedAt: user.updatedAt.toISOString(),
				},
			};
			return response;
		} catch(e: any) {
			console.log(e);
			return {
				status: 500,
				error: e.message,
			};
		}
	}

	static async verifyUserInApi() {
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
