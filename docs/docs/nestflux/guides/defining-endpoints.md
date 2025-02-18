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
You should add the new controller below the comment *"End core endpoints"*. See the example:

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

If you want to add an endpoint to an existing controller, you need to open the `*.controller-definition.ts` file that contains the controller definition. Then, just add the new endpoint inside the *endpoints* object. See the example:

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
