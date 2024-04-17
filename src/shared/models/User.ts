export interface IUser {
	id: string;
	email: string;
	phone: string | null;
	first_name: string | null;
	last_name: string | null;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export enum UserRole {
	Admin = "admin",
	Visitor = "visitor",
}