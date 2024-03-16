import { AuthService } from "@/services/AuthService/auth.service";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	try {
		const user = await AuthService.verifyUser();
		console.log(user);

		return NextResponse.json({
			ok: true,
			data: { ...user, password: undefined },
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
