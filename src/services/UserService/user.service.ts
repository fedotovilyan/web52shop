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

	static getUserByPhone(phone: string) {
		return prisma.user.findUnique({
			where: {
				phone,
			},
		});
	}

	static registerUser(payload: CreateUserPayloadDTO) {
		return prisma.user.create({
			data: {
				phone: payload.phone,
				password: payload.password,
				role: UserRole.Visitor,
			},
		});
	}
}