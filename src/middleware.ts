import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { Tokens } from "./shared/types/Tokens";
import { IUser, UserRole } from "./shared/models/User";
import { GetCurrentUser } from "./shared/api/User";
import { APP_URL } from "./shared/constants";

export async function middleware(request: NextRequest) {
	const { url, cookies } = request;

	const accessToken = cookies.get(Tokens.Access)?.value || "";
	let user: IUser | undefined;
	try {
		user = await GetCurrentUser(accessToken, APP_URL);
	} catch (e) {
		console.log(e);
		return NextResponse.rewrite(new URL("/404", request.url));
	}

	const isAdminPanel = url.includes("/panel");
	const isDashBoard = url.includes("/dashboard");

	console.log("middleware");
	console.log(user);

	if ((isAdminPanel || isDashBoard) && user?.role !== UserRole.Admin) {
		console.log("notFound");
		return NextResponse.rewrite(new URL("/404", request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/panel/:path*", "/dashboard/:path*"],
};
