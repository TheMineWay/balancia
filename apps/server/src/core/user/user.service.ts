import { Injectable } from "@nestjs/common";
import { UserRepository } from "@repository/core/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findByUsername(username: string) {
    return await this.userRepository.findByUsername(username);
  }
}
