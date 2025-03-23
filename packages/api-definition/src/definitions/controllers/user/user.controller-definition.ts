import { USER_SCHEMA } from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

const UPDATE_MY_PROFILE_NAME_DTO = USER_SCHEMA.pick({
  name: true,
  lastName: true,
});

export const USER_CONTROLLER_DEFINITION = {
  getName: () => "user",
  endpoints: {
    get: {
      getPath: () => "",
      responseDto: USER_SCHEMA,
    },
    update: {
      getPath: () => "update",
      method: EndpointMethod.PUT,
      dto: UPDATE_MY_PROFILE_NAME_DTO,
    },
  },
} as const satisfies ControllerDefinition;
