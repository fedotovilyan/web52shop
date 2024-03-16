export interface IUser {
	id: string;
	phone: string;
	email: string;
	first_name: string;
	last_name: string;
	role: UserRole;
	createdAt: string;
	updatedAt: string;
}

export enum UserRole {
	Admin = "admin",
	Visitor = "visitor",
}