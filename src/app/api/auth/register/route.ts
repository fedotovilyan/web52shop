import { AuthService } from "@/services/AuthService/auth.service";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JwtService } from "@/services/JwtService/jwt.service";
import { RegisterRequestDTO } from "./dto";

export async function POST(req: Request) {
  const body = (await req.json()) as RegisterRequestDTO;

  try {
    const { id } = await AuthService.register(body);

    const { accessToken, refreshToken } = JwtService.generateTokens({
      userId: id,
    });
    const { refreshCookie } = await AuthService.generateCookies({
      accessToken,
      refreshToken,
    });

    const cookiesApi = cookies();
    cookiesApi.set(refreshCookie);

    return NextResponse.json({
      ok: true,
      accessToken,
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
