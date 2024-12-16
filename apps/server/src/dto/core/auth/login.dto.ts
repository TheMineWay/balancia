import { ENV } from "@constants/conf/env.constant";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export class LoginDTO {
  @ApiProperty()
  @MaxLength(32)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @MaxLength(128)
  @IsNotEmpty()
  @IsString()
  password: string;

  @MaxLength(ENV.totp.digits)
  @MinLength(ENV.totp.digits)
  @IsNumberString()
  @IsOptional()
  totp?: string;
}
