import { prisma } from "@prisma";
import { CreateUserPayloadDTO } from "./dto/CreateUserPayload.dto";
import { IUser, UserRole } from "@/entities/User";

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
				email: payload.email,
				password: payload.password,
				role: UserRole.Visitor,
			},
		});
	}

	static update(id: string, payload: Partial<IUser>) {
		return prisma.user.update({
			where: {
				id,
			},
			data: {
				...payload,
				updatedAt: new Date(),
			},
		});
	}
}