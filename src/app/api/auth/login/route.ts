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
		const { id } = await AuthService.login(body);

		const { accessCookie, refreshCookie } = await AuthService.generateCookies({
			userId: id,
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
				message: e?.message,
			},
			{ status: e?.status || 500 }
		);
	}
}
