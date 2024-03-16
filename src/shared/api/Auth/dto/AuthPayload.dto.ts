import { IUser } from "@/shared/models/User";

export type AuthPayloadDTO = Pick<IUser, "email"> & { password: string };