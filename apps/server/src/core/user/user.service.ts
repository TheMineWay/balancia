import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
  private readonly users = [
    {
      id: 1,
      username: "john",
      password: "changeme",
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.username === username);
  }
}
