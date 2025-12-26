export enum UserRole {
	CUSTOMER = "CUSTOMER",
	BAR_STAFF = "BAR_STAFF",
	ADMIN = "ADMIN",
}

export interface User {
	id: string;
	email: string;
	username: string;
	role: UserRole;
	barId?: string;
	avatarUrl?: string;
	status?: string;
	loyaltyPoints?: number;
}
