import { IUser } from "@/entities/User/types/User";

export type AuthPayloadDTO = Pick<IUser, "email"> & { password: string };