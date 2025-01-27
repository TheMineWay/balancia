import { USER_MODEL_VALUES } from "@shared/models";
import { IsString, MaxLength, MinLength } from "class-validator";

export class UserPasswordUpdateDTO {
  @MaxLength(USER_MODEL_VALUES.password.maxLength)
  @MinLength(USER_MODEL_VALUES.password.minLength)
  @IsString()
  password: string;
}
