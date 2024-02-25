import { Tokens } from "@/shared/types/Tokens";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const cookiesApi = cookies();
	cookiesApi.set({
		name: Tokens.Access,
		value: '',
		expires: 0,
	});
	cookiesApi.set({
		name: Tokens.Refresh,
		value: "",
		expires: 0,
	});

	return NextResponse.json({
		ok: true,
	})
}