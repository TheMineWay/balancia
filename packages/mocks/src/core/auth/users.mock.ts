import { UserModel } from "@shared/models";

export const USERS_MOCK = {
  john: {
    id: 1,
    code: "john123",
    name: "John",
    lastName: "Doe",
    username: "john",
    email: "john.doe@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  alice: {
    id: 2,
    code: "alice456",
    name: "Alice",
    lastName: "Smith",
    username: "alice",
    email: "alice.smith@example.com",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} satisfies Record<string, UserModel>;
