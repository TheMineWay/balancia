import { Optional } from "@nestjs/common";
import { USER_MODEL_VALUES } from "@shared/models";
import { IsString, MaxLength, MinLength } from "class-validator";

export class UserProfileUpdateDTO {
  @MinLength(USER_MODEL_VALUES.name.minLength)
  @MaxLength(USER_MODEL_VALUES.name.maxLength)
  @IsString()
  name: string;

  @Optional()
  @MaxLength(USER_MODEL_VALUES.lastName.maxLength)
  @IsString()
  lastName: string;
}
