import { ENV } from "@constants/conf/env.constant";
import { ApiProperty } from "@nestjs/swagger";
import { USER_MODEL_VALUES } from "@shared/models";
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
  @MaxLength(USER_MODEL_VALUES.username.maxLength)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @MaxLength(USER_MODEL_VALUES.username.maxLength)
  @IsNotEmpty()
  @IsString()
  password: string;

  @MaxLength(ENV.totp.digits)
  @MinLength(ENV.totp.digits)
  @IsNumberString()
  @IsOptional()
  totp?: string;
}
