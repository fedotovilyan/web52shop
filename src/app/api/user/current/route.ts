import { JwtService } from "@/services/JwtService/jwt.service";
import { UserService } from "@/services/UserService/user.service";
import { Tokens } from "@/shared/types/Tokens";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const headersApi = headers();
	const accessToken = headersApi.get("Authorization")?.split?.(" ")?.[1] || "";

	if (!accessToken)
		return NextResponse.json(
			{ ok: false, message: "Вы не авторизованы" },
			{ status: 401 }
		);

	try {
		const decoded = JwtService.verifyToken(
			accessToken,
			Tokens.Access
		);

		const user = await UserService.getUserByEmail(decoded.email);
		
		return NextResponse.json({ ok: true, data: {...user, password: undefined} });
	} catch {
		return NextResponse.json(
			{ ok: false, message: "Вы не авторизованы" },
			{ status: 401 }
		);
	}
}
