import Zod from "zod";

const ENV_SCHEMA = Zod.object({
  API_HOST: Zod.string().url(),
}).required();

const TEST_VALUES: Partial<Zod.infer<typeof ENV_SCHEMA>> = {};

export const ENV = (() => {
  let env = process.env as unknown as Zod.infer<typeof ENV_SCHEMA>;

  if (process.env.TEST === "true") {
    env = { ...env, ...TEST_VALUES };
  }

  const values = ENV_SCHEMA.parse(env);

  return {
    api: {
      host: values.API_HOST,
    },
  };
})();
