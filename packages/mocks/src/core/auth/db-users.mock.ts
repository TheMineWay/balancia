import type { DbUserModel } from "@shared/models";

export const DB_USERS_MOCK = {
  "john.doe": {
    id: 1,
    name: "John",
    lastName: "Doe",
    username: "john.doe",
    email: "john.doe@testmail.com",
    password: "$2b$16$lmpU.Wlz8ay3qVerpXQG0OK.LVt6CfP81aIF7sI.ln9VrRgbLCfFa",
    totpSecret: null,
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  },
  "alice.smith": {
    id: 2,
    name: "Alice",
    lastName: "Smith",
    username: "alice.smith",
    email: "alice.smith@testmail.com",
    password: "$2b$16$lmpU.Wlz8ay3qVerpXQG0OK.LVt6CfP81aIF7sI.ln9VrRgbLCfFa",
    totpSecret: "supersecrettotp",
    createdAt: new Date("2024-02-01T12:30:00Z"),
    updatedAt: new Date("2024-02-01T12:30:00Z"),
  },
} satisfies Record<string, DbUserModel>;
