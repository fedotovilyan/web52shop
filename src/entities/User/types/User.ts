import { UserRole } from "..";

export interface IUser {
	phone: string;
	email: string;
	first_name: string;
	last_name: string;
	role: UserRole;
}