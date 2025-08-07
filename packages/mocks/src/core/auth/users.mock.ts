import { UserModel } from "@shared/models";

export const USERS_MOCK = {
	john: {
		id: 1,
		code: "john123",
		name: "John Doe",
		username: "johndoe",
		createdAt: new Date(),
		updatedAt: new Date(),
		email: null,
	},
	alice: {
		id: 2,
		code: "alice456",
		name: "Alice Smith",
		username: "alicesmith",
		createdAt: new Date(),
		updatedAt: new Date(),
		email: null,
	},
} satisfies Record<string, UserModel>;
