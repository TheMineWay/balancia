import { UserSelect } from "@database/schemas/main/tables/users.table";

export const USERS_MOCK = {
  "john.doe": {
    id: 1,
    name: "John",
    lastName: "Doe",
    username: "john.doe",
    email: "john.doe@testmail.com",
    password:
      "UrHrMPD7b3d4F5pO9iqNyQ==:BZPLVcmAy4EGfXZr9LW6YRcXEgEFHvVrrwIvqQlhgKidzlvRrRCugSvrwaRnI26OjcMs/8pZOrSVqOsj/m5qMg==",
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
    password:
      "UrHrMPD7b3d4F5pO9iqNyQ==:BZPLVcmAy4EGfXZr9LW6YRcXEgEFHvVrrwIvqQlhgKidzlvRrRCugSvrwaRnI26OjcMs/8pZOrSVqOsj/m5qMg==",
    totpSecret: "supersecrettotp",
    createdAt: new Date("2024-02-01T12:30:00Z"),
    updatedAt: new Date("2024-02-01T12:30:00Z"),
  },
} satisfies Record<string, UserSelect>;
