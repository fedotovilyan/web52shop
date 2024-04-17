import { AuthService } from "@/services/AuthService/auth.service";
import { JwtService } from "@/services/JwtService/jwt.service";
import { Tokens } from "@/shared/types/Tokens";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const cookiesApi = cookies();
	const refreshToken = cookiesApi.get(Tokens.Refresh)?.value || "";
	const user = {
		id: "",
	};

	try {
		const decoded = JwtService.verifyToken(refreshToken, Tokens.Refresh);
		user.id = decoded.userId;
	} catch (e) {
		console.log(e);
		return NextResponse.json(
			{
				ok: false,
				message: "Вы не авторизованы",
			},
			{ status: 401 }
		);
	}

	try {
		const { accessToken, refreshToken } = JwtService.generateTokens({
			userId: user.id,
		});
		const { refreshCookie } = await AuthService.generateCookies({
			accessToken,
			refreshToken,
		});

		cookiesApi.set(refreshCookie);

		return NextResponse.json({
			ok: true,
			accessToken,
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
