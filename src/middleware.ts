import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Tokens } from "./shared/types/Tokens";
import { JwtService } from "./services/JwtService/jwt.service";
import { notFound } from 'next/navigation';
import { IUser } from "./entities/User/types/User";
import { UserService } from "./services/UserService/user.service";
import { UserRole } from "./entities/User";

export async function middleware(request: NextRequest) {
	const { url, cookies } = request;

	const refreshToken = cookies.get(Tokens.Refresh)?.value || "";
	const user: Partial<IUser> = {
		email: "",
	};
	try {
		const decoded = JwtService.verifyToken(refreshToken, Tokens.Refresh);
		user.email = decoded.email;
	} catch (e) {
		return notFound();
	}

	const res = await UserService.getUserByEmail(user.email);
	user.role = res?.role as UserRole;

	const isAdminPanel = url.includes("/backoffice");
	const isDashBoard = url.includes("/dashboard");

	if ((isAdminPanel || isDashBoard) && user.role !== UserRole.Admin) {
		return notFound();
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/backoffice/:path*", "/dashboard/:path*"],
};
