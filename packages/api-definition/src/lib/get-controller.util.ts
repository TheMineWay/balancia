import { getPath } from "@/lib/get-path.util";
import { ControllerDefinition } from "@ts-types/controller-definition.type";

export const getController = <
  P extends Record<string, string>,
  C extends ControllerDefinition<P> = ControllerDefinition<P>
>(
  controller: C,
  params: P
) => getPath(controller, params);
