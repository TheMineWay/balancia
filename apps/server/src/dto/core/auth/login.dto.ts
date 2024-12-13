import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class LoginDTO {
  @ApiProperty()
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @MaxLength(128)
  @IsNotEmpty()
  @IsString()
  password: string;
}
