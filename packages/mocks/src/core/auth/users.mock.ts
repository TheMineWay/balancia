import { UserModel } from "@shared/models";

export const USERS_MOCK = {
  john: {
    id: 1,
    code: "john123",
    name: "John Doe",
    username: "johndoe",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  alice: {
    id: 2,
    code: "alice456",
    name: "Alice Smith",
    username: "alicesmith",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
} satisfies Record<string, UserModel>;
