import { IUser } from "@/shared/models/User";

export type VerifyUserByRefreshTokenResponseDTO = {
	status: 200,
	user: IUser,
} | { status: 500, error: string } | { status: 401 }