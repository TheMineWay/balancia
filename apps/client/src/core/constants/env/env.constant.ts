import Zod, { z } from "zod";

const ENV_SCHEMA = Zod.object({
  VITE_API_HOST: Zod.string().url(),
  VITE_TEST: Zod.union([z.literal("true"), z.literal("false"), z.undefined()])
    .default("false")
    .transform((val) => val === "true")
}).required();

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {};

export const ENV = (() => {
  let env = import.meta.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

  if (env.VITE_TEST) {
    env = { ...env, ...TEST_VALUES };
  }

  const values = ENV_SCHEMA.parse(env);

  return {
    api: {
      host: values.VITE_API_HOST,
    },
  };
})();
