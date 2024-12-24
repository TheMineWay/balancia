import Zod from "zod";

const ENV_SCHEMA = Zod.object({}).required();

export const ENV = {};
