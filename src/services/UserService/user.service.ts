import { prisma } from "@prisma";
import { CreateUserPayloadDTO } from "./dto/CreateUserPayload.dto";
import { UserRole } from "@/entities/User";

export class UserService {
	static getUserByEmail(email: string) {
		return prisma.user.findUnique({
			where: {
				email,
			},
		});
	}

	static registerUser(payload: CreateUserPayloadDTO) {
		return prisma.user.create({
			data: {
				email: payload.email,
				password: payload.password,
				role: UserRole.Guest,
			},
		})
	}
}