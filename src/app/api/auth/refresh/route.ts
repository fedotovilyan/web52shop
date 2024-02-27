import { AuthService } from "@/services/AuthService/auth.service";
import { JwtService } from "@/services/JwtService/jwt.service";
import { Tokens } from "@/shared/types/Tokens";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const cookiesApi = cookies();
	const refreshToken = cookiesApi.get(Tokens.Refresh)?.value || "";
	const user = {
		email: "",
	};

	try {
		const decoded = JwtService.verifyToken(refreshToken, Tokens.Refresh);
		user.email = decoded.email;
	} catch (e) {
		return NextResponse.json(
			{
				ok: false,
				msg: "Вы не авторизованы",
			},
			{ status: 401 }
		);
	}

	try {
		const { accessCookie, refreshCookie } = AuthService.generateCookies({
			email: user.email,
		});

		cookiesApi.set(accessCookie);
		cookiesApi.set(refreshCookie);

		return NextResponse.json({
			ok: true,
			message: "Успех",
		});
	} catch (e: any) {
		return NextResponse.json(
			{
				ok: false,
				message: e.message,
			},
			{ status: 500 }
		);
	}
}
