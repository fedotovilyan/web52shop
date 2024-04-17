import { AuthService } from "@/services/AuthService/auth.service";
import { NextResponse } from "next/server";
import { UpdateUserBodyDTO } from "./dto";
import { UserService } from "@/services/UserService/user.service";
import { revalidateTag } from "next/cache";

export async function PATCH(req: Request) {
	try {
		const user = await AuthService.verifyUserInApi();
		const body = (await req.json()) as UpdateUserBodyDTO;

		if (!user) {
			return NextResponse.json({
				ok: false,
				message: "Пользователь не найден",
			});
		}

		const response = await UserService.update(user.id, body);
		revalidateTag("profile");

		return NextResponse.json({
			ok: true,
			data: { ...response, password: undefined },
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
