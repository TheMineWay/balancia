import Zod, { z } from "zod";

const ENV_SCHEMA = Zod.object({
  VITE_API_HOST: Zod.string().url(),
  NODE_ENV: Zod.union([
    z.literal("development"),
    z.literal("production"),
    z.literal("test"),
  ]).default("production"),
}).required();

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {
  VITE_API_HOST: "http://localhost:3000",
};

export const ENV = (() => {
  let env = import.meta.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

  if (env.NODE_ENV === "test") {
    env = { ...env, ...TEST_VALUES };
  }

  const values = ENV_SCHEMA.parse(env);

  return {
    api: {
      host: values.VITE_API_HOST,
    },
  };
})();
