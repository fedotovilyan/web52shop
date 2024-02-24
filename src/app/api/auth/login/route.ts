import { AuthService } from "@/services/AuthService/auth.service";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

interface IBody {
	email: string;
	password: string;
}

export async function POST(req: Request) {
	const body = (await req.json()) as IBody;

	try {
		const { email } = await AuthService.login(body);

		const { accessCookie, refreshCookie } = AuthService.generateCookies({
			email,
		});

		const cookiesApi = cookies();
		cookiesApi.set(accessCookie);
		cookiesApi.set(refreshCookie);

		return NextResponse.json({
			ok: true,
			message: "Вход выполнен успешно",
		});
	} catch (e: any) {
		return NextResponse.json(
			{
				ok: false,
				message: e?.message || "Что-то пошло не так на сервере",
			},
			{ status: e?.status || 500 }
		);
	}
}
