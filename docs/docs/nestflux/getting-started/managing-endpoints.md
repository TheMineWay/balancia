---
sidebar_position: 4
---

# ⚙️ Managing Endpoints

NestFlux uses a unique approach to endpoint management that ensures **type safety** and **consistency** between client and server. Endpoints are defined in the `@shared/api-definition` package, providing a single source of truth for API contracts with automatic DTO validation.

## 🎯 Overview

The endpoint management system in NestFlux provides:

- **🔗 Type-safe contracts** between client and server
- **✅ Automatic DTO validation** for request bodies, query parameters, and responses
- **🏗️ Structured organization** with controller-based grouping
- **🔄 Consistent API patterns** across the entire application
- **📝 Self-documenting** endpoints with TypeScript inference

---

## 📋 Architecture

### Package Structure

```
packages/api-definition/
└── src/
    └── definitions/
        └── controllers/
            └── ...
```

### Core Components

- **📁 Controller Definitions** - Group related endpoints together
- **🎯 Endpoint Definitions** - Define individual API endpoints
- **📝 DTOs** - Zod schemas for validation
- **🔧 Type Inference** - Automatic TypeScript type generation

---

## 🏗️ Creating Controller Definitions

### Basic Controller Structure

Each controller should be in its own file following this pattern:

```typescript
// packages/api-definition/src/definitions/controllers/core/example/example.controller-definition.ts

import { z } from "zod";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

// Define your endpoint
const GET_EXAMPLE_ENDPOINT = {
  getPath: () => [], // Root path of controller
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    message: z.string(),
    data: z.array(z.object({
      id: z.number(),
      name: z.string(),
    })),
  }),
} satisfies EndpointDefinition;

// Export the controller
export const EXAMPLE_CONTROLLER = {
  getPath: () => ["example"], // /api/example
  paramsMapping: {},
  endpoints: {
    get: GET_EXAMPLE_ENDPOINT,
  },
} satisfies ControllerDefinition;
```

### Controller with Path Parameters

```typescript
// Controller with dynamic path parameters
export const USER_CONTROLLER = {
  getPath: () => ["users"],
  paramsMapping: {},
  endpoints: {
    getById: {
      getPath: (params) => ["user", params.userId], // /api/users/user/{userId}
      paramsMapping: { userId: "userId" },
      method: EndpointMethod.GET,
      responseDto: USER_SCHEMA,
    } satisfies EndpointDefinition<{ userId: string }>,
    
    list: {
      getPath: () => [], // /api/users
      paramsMapping: {},
      method: EndpointMethod.GET,
      responseDto: getPaginatedResponse(USER_SCHEMA),
      queryDto: PAGINATED_SEARCH_SCHEMA,
    } satisfies EndpointDefinition,
  },
} satisfies ControllerDefinition;
```

---

## 🎯 Endpoint Definitions

### Endpoint Structure

Each endpoint definition includes:

```typescript
const ENDPOINT_NAME = {
  // Path configuration
  getPath: (params?) => string[], // URL segments
  paramsMapping: { paramName: "paramName" }, // Parameter mapping
  
  // HTTP method
  method: EndpointMethod.POST, // GET, POST, PUT, DELETE, etc.
  
  // DTOs (all optional)
  bodyDto?: ZodObject,     // Request body validation
  queryDto?: ZodObject,    // Query parameters validation  
  responseDto?: ZodObject, // Response validation
} satisfies EndpointDefinition<{ /* path params */ }>;
```

### HTTP Methods

```typescript
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

// Available methods:
EndpointMethod.GET      // Read operations
EndpointMethod.POST     // Create operations
EndpointMethod.PUT      // Update operations (full replace)
EndpointMethod.PATCH    // Update operations (partial)
EndpointMethod.DELETE   // Delete operations
```

### Real-World Examples

#### 1. Simple GET Endpoint

```typescript
const GET_SERVER_INFO_ENDPOINT = {
  getPath: () => ["info"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    version: z.string(),
    environment: z.string(),
    uptime: z.number(),
  }),
} satisfies EndpointDefinition;
```

#### 2. POST with Body Validation

```typescript
const CREATE_USER_ENDPOINT = {
  getPath: () => [],
  paramsMapping: {},
  method: EndpointMethod.POST,
  bodyDto: z.object({
    name: z.string().min(1).max(100),
    email: z.email(),
    role: z.enum(["user", "admin"]),
  }),
  responseDto: USER_SCHEMA,
} satisfies EndpointDefinition;
```

#### 3. GET with Query Parameters

```typescript
const SEARCH_USERS_ENDPOINT = {
  getPath: () => ["search"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  queryDto: z.object({
    q: z.string().min(1),
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(20),
    sortBy: z.enum(["name", "email", "createdAt"]).default("name"),
    order: z.enum(["asc", "desc"]).default("asc"),
  }),
  responseDto: getPaginatedResponse(USER_SCHEMA),
} satisfies EndpointDefinition;
```

#### 4. Complex Endpoint with Path Parameters

```typescript
const UPDATE_USER_ROLE_ENDPOINT = {
  getPath: (params) => ["user", params.userId, "role", params.roleId],
  paramsMapping: { userId: "userId", roleId: "roleId" },
  method: EndpointMethod.PUT,
  bodyDto: z.object({
    permissions: z.array(z.enum(Permission)),
    expiresAt: z.string().datetime().optional(),
  }),
  responseDto: z.object({
    success: z.boolean(),
    updatedAt: z.string().datetime(),
  }),
} satisfies EndpointDefinition<{ userId: string; roleId: string }>;
```

---

## 🔧 Server Implementation

### Controller Setup

```typescript
// apps/server/src/controllers/example.controller.ts

import { Controller } from "@nestjs/common";
import { 
  EXAMPLE_CONTROLLER, 
  getController,
  type InferBodyDto,
  type InferQueryDto,
  type InferResponseDto,
} from "@shared/api-definition";
import { Endpoint } from "src/decorators/endpoints/endpoint.decorator";
import { ValidatedBody } from "src/decorators/validation/validated-body.decorator";
import { ValidatedQuery } from "src/decorators/validation/validated-query.decorator";

@Controller(getController(EXAMPLE_CONTROLLER, {}))
export class ExampleController {
  constructor(private readonly exampleService: ExampleService) {}

  @Endpoint(EXAMPLE_CONTROLLER, "get")
  async getExamples(): Promise<InferResponseDto<typeof EXAMPLE_CONTROLLER, "get">> {
    return this.exampleService.getAll();
  }

  @Endpoint(EXAMPLE_CONTROLLER, "create")
  async createExample(
    @ValidatedBody(EXAMPLE_CONTROLLER, "create")
    body: InferBodyDto<typeof EXAMPLE_CONTROLLER, "create">
  ): Promise<InferResponseDto<typeof EXAMPLE_CONTROLLER, "create">> {
    return this.exampleService.create(body);
  }

  @Endpoint(EXAMPLE_CONTROLLER, "search")
  async searchExamples(
    @ValidatedQuery(EXAMPLE_CONTROLLER, "search")
    query: InferQueryDto<typeof EXAMPLE_CONTROLLER, "search">
  ): Promise<InferResponseDto<typeof EXAMPLE_CONTROLLER, "search">> {
    return this.exampleService.search(query);
  }
}
```

### Key Decorators

#### `@Endpoint()` Decorator
Automatically configures the HTTP method and path based on the endpoint definition:

```typescript
@Endpoint(CONTROLLER_DEFINITION, "endpointKey")
```

#### `@ValidatedBody()` Decorator
Validates request body using the endpoint's `bodyDto`:

```typescript
@ValidatedBody(CONTROLLER_DEFINITION, "endpointKey")
body: InferBodyDto<typeof CONTROLLER_DEFINITION, "endpointKey">
```

#### `@ValidatedQuery()` Decorator
Validates query parameters using the endpoint's `queryDto`:

```typescript
@ValidatedQuery(CONTROLLER_DEFINITION, "endpointKey")
query: InferQueryDto<typeof CONTROLLER_DEFINITION, "endpointKey">
```

### Type Inference Utilities

```typescript
// Infer types from endpoint definitions
type BodyType = InferBodyDto<typeof CONTROLLER, "endpoint">;
type QueryType = InferQueryDto<typeof CONTROLLER, "endpoint">;
type ResponseType = InferResponseDto<typeof CONTROLLER, "endpoint">;
```

---

## 🖥️ Client Usage

### React Hook Integration

```typescript
// apps/client/src/features/users/hooks/use-users.ts

import { useAuthenticatedRequest } from "@core/auth/session/hooks/use-authenticated-request.util";
import { useQuery, useMutation } from "@tanstack/react-query";
import { USER_CONTROLLER } from "@shared/api-definition";
import { endpointQuery } from "@core/requests/lib/endpoint-query.util";
import { endpointMutation } from "@core/requests/lib/endpoint-mutation.util";

// Query example

export const USE_USERS_QUERY_KEY: ParametrizedQueryKey<{ q?: string; page?: number }> = (params) => ['users', params];
// If no params are needed on query key, you should use QueryKey.

export const useUsersQuery = (searchParams: { q?: string; page?: number }) => {
  const { request } = useAuthenticatedRequest(); // or useRequest()

  return useQuery({
    queryKey: USE_USERS_QUERY_KEY(searchParams),
    queryFn: endpointQuery(
        USER_CONTROLLER,        // Controller
        'search',               // Endpoint
        {},                     // Path params (if needed)
        request,                // Request method
        { query: searchParams } // Data (body, query)
    ),
  });
};

// Mutation example
export const useCreateUserMutation = () => {
  const { request } = useAuthenticatedRequest();

  return useMutation({
    mutationFn: endpointMutation(USER_CONTROLLER, 'create', {}, request),
  });
};
```

---

## 📝 DTO Patterns

### Using Shared Schemas

```typescript
import { USER_SCHEMA, ROLE_SCHEMA } from "@shared/models";

const CREATE_USER_ENDPOINT = {
  getPath: () => [],
  paramsMapping: {},
  method: EndpointMethod.POST,
  bodyDto: USER_SCHEMA.omit({ id: true, createdAt: true, updatedAt: true }),
  responseDto: USER_SCHEMA,
} satisfies EndpointDefinition;
```

### Extending Schemas

```typescript
const USER_WITH_STATS_ENDPOINT = {
  getPath: () => ["with-stats"],
  paramsMapping: {},
  method: EndpointMethod.GET,
  responseDto: z.object({
    users: z.array(
      USER_SCHEMA.extend({
        postCount: z.number(),
        lastLoginAt: z.date(),
      })
    ),
    totalUsers: z.number(),
  }),
} satisfies EndpointDefinition;
```

### Pagination Pattern

It is included a standard paginated schema that helps you build endpoints with pagination.

```typescript
import { getPaginatedResponse, PAGINATED_SEARCH_SCHEMA } from "@shared/models";

const LIST_ENDPOINT = {
  getPath: () => [],
  paramsMapping: {},
  method: EndpointMethod.GET,
  queryDto: z.object({
    ...PAGINATED_SEARCH_SCHEMA.shape,
    category: z.string().optional(),
  }),
  responseDto: getPaginatedResponse(ITEM_SCHEMA),
} satisfies EndpointDefinition;
```

---

## ✅ Best Practices

### 1. **Consistent Naming**
```typescript
// Use descriptive, consistent names
const GET_USER_LIST_ENDPOINT = { ... };
const CREATE_USER_ENDPOINT = { ... };
const UPDATE_USER_ENDPOINT = { ... };
const DELETE_USER_ENDPOINT = { ... };
```

### 2. **Logical Grouping**
```typescript
// Group related endpoints in controllers
export const USER_CONTROLLER = {
  endpoints: {
    list: GET_USER_LIST_ENDPOINT,
    create: CREATE_USER_ENDPOINT,
    update: UPDATE_USER_ENDPOINT,
    delete: DELETE_USER_ENDPOINT,
  },
};
```

### 3. **Reuse Schemas**
```typescript
// Import and reuse schemas from @shared/models
import { USER_SCHEMA, ROLE_SCHEMA } from "@shared/models";

const responseDto = z.object({
  user: USER_SCHEMA,
  roles: z.array(ROLE_SCHEMA),
});
```

### 4. **Validate Everything**
```typescript
// Always define DTOs for validation
const ENDPOINT = {
  bodyDto: CREATION_SCHEMA,    // Validate input
  queryDto: FILTER_SCHEMA,     // Validate query params
  responseDto: RESPONSE_SCHEMA, // Validate output
};
```

### 5. **Use Type Inference**
```typescript
// Leverage TypeScript inference
type CreateUserBody = InferBodyDto<typeof USER_CONTROLLER, "create">;
type UserListResponse = InferResponseDto<typeof USER_CONTROLLER, "list">;
```
