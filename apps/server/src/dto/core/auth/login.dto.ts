import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  login: string;

  @MaxLength(128)
  @IsNotEmpty()
  @IsString()
  password: string;
}
