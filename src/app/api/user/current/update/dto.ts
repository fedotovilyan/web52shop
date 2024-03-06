import { IUser } from "@/entities/User";

export type UpdateUserBodyDTO = Partial<IUser>;

export type UpdateUserResponseDTO = IUser;