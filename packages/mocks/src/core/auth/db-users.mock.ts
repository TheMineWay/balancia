import type { DbUserModel } from "@shared/models";

export const DB_USERS_MOCK = {
  "john.doe": {
    id: 1,
    code: "john123",
    createdAt: new Date("2024-01-01T00:00:00Z"),
    updatedAt: new Date("2024-01-01T00:00:00Z"),
  },
  "alice.smith": {
    id: 2,
    code: "alice456",
    createdAt: new Date("2024-02-01T12:30:00Z"),
    updatedAt: new Date("2024-02-01T12:30:00Z"),
  },
} satisfies Record<string, DbUserModel>;
