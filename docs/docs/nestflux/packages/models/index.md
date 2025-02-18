---
sidebar_position: 1
---

# Models package

This package contains shared models and `Zod` schemas that can be used across all projects.

## Defining models

Each model is based of three components:

- **model values**: a constant that contains restrictions for each field of the model (such as min length, max length, etc).
- **schema**: a `Zod` object containing types and validation rules. Validation values should refer to the *model value*.
- **model**: a TS model inferred from the schema.

All components are exported and available to use on packages and apps.

## Example

See this example of a user model and validation schema.

```ts
import { ModelValues } from "@ts-types/model-values.type";
import { number, object, string, z } from "zod";

// Model schema validation limits
export const USER_MODEL_VALUES = {
  name: {
    minLength: 1,
    maxLength: 64,
  },
  username: {
    minLength: 4,
    maxLength: 32,
  },
  age: {
    min: 0,
    max: 130,
  },
} satisfies ModelValues;

// The schema used for validation
export const USER_SCHEMA = object({
  id: number(), // As this does not need validation, it is not present on USER_MODEL_VALUES
  name: string().min(USER_MODEL_VALUES.name.minLength).max(USER_MODEL_VALUES.name.maxLength),
  username: string().min(USER_MODEL_VALUES.username.minLength).max(USER_MODEL_VALUES.username.maxLength),
  email: string().email().nullable().optional(),
  age: number().minValue(USER_MODEL_VALUES.age.min).maxValue(USER_MODEL_VALUES.age.max)
});

// The model type
export type UserModel = z.infer<typeof USER_SCHEMA>;
```
