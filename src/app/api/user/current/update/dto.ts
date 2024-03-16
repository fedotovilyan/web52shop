import { IUser } from "@/shared/models/User";

export type UpdateUserBodyDTO = Partial<IUser>;

export type UpdateUserResponseDTO = IUser;