import { IUser } from "@/entities/User/types/User";

export type RegisterUserPayloadDTO = Pick<IUser, 'phone'> & { password: string }