import { prisma } from "@prisma";
import { CreateUserPayloadDTO } from "./dto/CreateUserPayload.dto";
import { UserRole, IUser } from "@/shared/models/User";
import { Prisma } from '@prisma/client';

export class UserService {
	static findUser(where: Prisma.UserWhereUniqueInput) {
		return prisma.user.findUnique({
			where,
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