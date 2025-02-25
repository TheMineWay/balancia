---
sidebar_position: 2
---

# Defining endpoints & DTOs

NestFlux provides a type-safe way of transferring data between the client and the server via HTTP. This means TypeScript will only allow requests to existing endpoints. Also, DTOs will be automatically applied and validated. This can avoid bad typings errors that might be noticed after deployment.

To achieve this NestFlux uses a package named `api-definition` (stored inside the `packages` folder). Its main objective is to store all available endpoints grouped by controllers (including path, parameters and DTOs).

## Hierarchy

The package follows the following file structure:

```text
api-definition/
├── definitions/
│   ├── controllers/
│   │   └── ...                     # Recommendation: one file per controller
│   ├── controllers-definition.ts   # File containing all controller definitions (imported from files inside the controllers directory)
├── types/                          # Types related to this package
└── utils/                          # Utilities related to this package
```

You will rarely modify files outside the `api-definition/definitions` folder.

## Creating new controllers

Whenever you need a new controller you should create it in the `api-definition` package.

First, you need to create a new file for the controller inside the `controllers` directory (it is a good idea to group similar controllers in folders. You are free to create as much folders as you want inside the `controllers` folder).

The file should be named like **\<\<controller-name\>\>.controller-definition.ts** (as the [NestFlux name conventions](/docs/nestflux/naming.mdx) specifies).

The file must contain a constant that satisfies the `ControllerDefinition` type exported as `const` (TypeScript as const). See the example below:

```ts
import { ControllerDefinition } from "@ts-types";

export const PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "profile", // Controller name
  endpoints: {},
} as const satisfies ControllerDefinition; // Exported as const and satisfying ControllerDefinition
```

Now, you need to add this controller to the `controllers-definition.ts` file (located in the `definitions` directory).
You should add the new controller below the comment _"End core endpoints"_. See the example:

```ts
export const CONTROLLERS = {
  // Core endpoints
  auth: AUTH_CONTROLLER_DEFINITION, // This is a CORE endpoint created by the scaffold. It should not be updated.
  // End core endpoints
  profile: PROFILE_CONTROLLER_DEFINITION, // This is the new endpoint
  /// ... more endpoints should go here
} as const;
```

## Adding endpoints to a controller

If you want to add an endpoint to an existing controller, you need to open the `*.controller-definition.ts` file that contains the controller definition. Then, just add the new endpoint inside the _endpoints_ object. See the example:

```ts
export const PROFILE_CONTROLLER_DEFINITION = {
  getName: () => "profile",
  endpoints: {
    getInfo: { // Endpoint name (visible on the project)
      getPath: () => "", // Empty will be "/"
      method: "GET",    // Specify the method (by default GET)
    },
    ... // More endpoints
  },
} as const satisfies ControllerDefinition;

```

Now your controller has a new endpoint ready to be used.

:::warning

Defining endpoints and controllers don't adds them to the NestJS project automatically. See [Implementing endpoints on the API](/) to see how.

:::

### Using path variables

If your endpoint needs to use a path variable (or more than one), you can add it easily. See the example for fetching a user by id:

```ts
export const USERS_CONTROLLER_DEFINITION = {
  getName: () => "users",
  endpoints: {
    getById: {
      getPath: (options: { userId: number }) => `${options.userId}`,
      method: "GET",
    },
  },
} as const satisfies ControllerDefinition;
```

This can be used also in controllers:

```ts
export const USERS_CONTROLLER_DEFINITION = {
  getName: (options: { userId: number }) => `${options.userId}`,
  endpoints: {
    get: {
      getPath: () => "",
      method: "GET",
    },
  },
} as const satisfies ControllerDefinition;
```

## Schema validation & transformations

Schema validations and transformations can be applied on the request payload and the server response. This not only protects your API from malicious requests that do not comply with expected request data, this also allows you to transform incoming data to a desired format.

Both DTOs are defined using [Zod](https://zod.dev/) schemas.

Also, when using DTOs, the client and the server are able to share a unique _TypeScript_ type inferred from the schema. This allows you to have one unique type that is shared across client and server. This prevents request type errors when DTOs are modified.

### Validation

Automatically reject requests that don't match a expected data schema.

```ts
export const USERS_CONTROLLER_DEFINITION = {
  getName: (options: { userId: number }) => `${options.userId}`,
  endpoints: {
    login: {
      getPath: () => "login",
      method: "POST",
      dto: Zod.object({
        password: string().min(1).max(32), // Validate that the password is a string between 1-32 characters
        username: string().min(6).max(32), // Validate that the username is a string between 6-32 characters
      }),
    },
  },
} as const satisfies ControllerDefinition;
```

:::info

When validation occurs, extra fields that are not specified in the schema are removed. This prevents malicious requests from injecting malicious data.

:::

### Transformation

You might want to transform some data from the incoming request (or from the server response). The most popular scenario are requests with dates. As dates are usually transferred as **string** or **number** you might want to convert them to **Date** objects. See the example:

```ts
export const USERS_CONTROLLER_DEFINITION = {
  getName: (options: { userId: number }) => `${options.userId}`,
  endpoints: {
    login: {
      getPath: () => "login",
      method: "POST",
      dto: Zod.object({
        // First, validate that it is a string. Then, transform the string date to a real Date object.
        date: Zod.string().transfform((value) => new Date(value)),
      }),
    },
  },
} as const satisfies ControllerDefinition;
```

## Response DTO

You can apply validation and transformations on the server response (on client side). Instead of using the `dto` property, you need to use the `responseDto` (both can be used at the same time).

```ts
export const AUTH_CONTROLLER_DEFINITION = {
  getName: () => "auth",
  endpoints: {
    login: {
      method: "POST",
      getPath: () => "login",
      dto: LOGIN_DTO, // LOGIN_DTO is a Zod schema
      responseDto: Zod.object({
        token: string(),
        user: USER_SCHEMA, // USER_SCHEMA is a Zod schema
      }),
    },
  },
} as const satisfies ControllerDefinition;
```
