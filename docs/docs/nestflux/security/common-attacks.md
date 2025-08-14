---
sidebar_position: 4
---

# ⚔️ Common Attacks and Security Measures

NestFlux implements multiple layers of security to protect against common web application attacks. This document explains the various security measures implemented and their limitations, helping you understand what's protected and what additional measures you might need.

## 📋 Overview

Security is implemented through multiple defense mechanisms:

- **🚦 Rate Limiting** - DoS/DDoS protection at the application level
- **🌐 CORS Configuration** - Cross-origin request control
- **⛑️ Helmet** - HTTP security headers
- **📏 Request Size Limits** - Payload size restrictions
- **🗃️ SQL Injection Prevention** - Drizzle ORM parameterized queries
- **✅ Input Validation** - Zod-based request validation and sanitization

Each measure addresses specific attack vectors but has limitations that should be understood for a complete security posture.

---

## 🚦 Denial of Service (DoS) Protection

### ✅ What NestFlux Implements

NestFlux uses the **NestJS Throttler** for application-level rate limiting. TTL can be customized via env variables.

### 🛡️ What It Prevents
- **Application-level DoS**: Protects against individual clients overwhelming your application
- **Resource exhaustion**: Prevents excessive API calls from consuming server resources

### ⚠️ What It Doesn't Prevent
- **Distributed Denial of Service (DDoS)**: Multiple clients attacking from different IPs
- **Network-level attacks**: Attacks targeting infrastructure below the application layer
- **Resource-intensive requests**: A few legitimate but heavy requests can still cause issues

### 🌍 Additional DDoS Protection

For production environments, implement external protection. For example:
- **🟦 Azure Front Door**: Microsoft's Web Application Firewall (WAF)
- **☁️ Cloudflare**: Web Application Firewall (WAF) with DDoS protection
- **🛡️ AWS Shield**: Advanced DDoS protection for AWS infrastructure

---

## 🌐 Cross-Origin Resource Sharing (CORS)

### ✅ What NestFlux Implements

Configurable [CORS](https://developer.mozilla.org/es/docs/Web/HTTP/Guides/CORS) policy in the main application.

### 🛡️ What It Prevents
- **Cross-origin attacks**: Blocks unauthorized domains from making requests
- **CSRF via XHR**: Prevents malicious sites from making AJAX requests
- **Data theft**: Stops unauthorized JavaScript from accessing your API

### ⚠️ What It Doesn't Prevent
- **CSRF with forms**: Simple POST forms can still bypass CORS
- **Server-to-server attacks**: CORS is a browser-enforced policy
- **Mobile app attacks**: Native apps aren't subject to CORS restrictions

### 💡 Best Practices
```bash
# Production configuration example
CORS_ONLY_ALLOW_DOMAINS="https://yourdomain.com,https://admin.yourdomain.com"

# ❌ Never use in production:
# CORS_ONLY_ALLOW_DOMAINS="*"
```

---

## ⛑️ Helmet - HTTP Security Headers

### ✅ What NestFlux Implements

[Helmet](https://github.com/helmetjs/helmet) middleware is applied globally.

### ❓ What is it

Helmet is a Node.js middleware for Express that helps secure web applications by setting various HTTP headers. It can prevent or mitigate common web vulnerabilities—like cross-site scripting (XSS), clickjacking, and sniffing attacks—by configuring headers such as Content-Security-Policy, X-Frame-Options, and Strict-Transport-Security. Essentially, it acts as a protective helmet for your app’s HTTP responses.

### 🔒 Security Headers Applied

**🛡️ Content Security Policy (CSP):**
- Prevents XSS by controlling resource loading
- Blocks inline scripts and unauthorized external resources

**🖼️ X-Frame-Options:**
- Prevents clickjacking attacks
- Stops your site from being embedded in malicious frames

**📄 X-Content-Type-Options:**
- Prevents MIME type sniffing
- Ensures browsers respect declared content types

**🌐 X-DNS-Prefetch-Control:**
- Controls DNS prefetching to prevent information leakage

**🔗 Referrer Policy:**
- Controls referrer information sent with requests

**➕ Additional Headers:**
- `Strict-Transport-Security` (HSTS)
- `X-Download-Options`
- `X-Permitted-Cross-Domain-Policies`

### 🛡️ What It Prevents
- **XSS attacks**: CSP blocks many cross-site scripting attempts
- **Clickjacking**: Frame options prevent UI redressing
- **MIME sniffing attacks**: Content type enforcement
- **Information disclosure**: Controlled referrer and DNS policies

### ⚠️ What It Doesn't Prevent
- **XSS in user-generated content**: Still need input validation/sanitization
- **SQL injection**: Headers don't protect against database attacks
- **Business logic flaws**: Headers are preventative, not comprehensive
- **Social engineering**: Headers can't prevent user manipulation

---

## 📏 Request Size Limits

### ✅ What NestFlux Implements

Body parser with size restrictions on every request. This prevents larger requests from being processed, causing server stress.

### 🛡️ What It Prevents
- **Large payload attacks**: Prevents oversized requests from consuming memory
- **Zip bombs**: Limits compressed payload size
- **Memory exhaustion**: Caps request processing resource usage
- **Storage overflow**: Prevents filling up disk space with large uploads

### ⚠️ What It Doesn't Prevent
- **Multiple small requests**: Many small requests can still overwhelm
- **Slow loris attacks**: Gradual payload delivery over time
- **Application-level resource exhaustion**: Complex operations on small payloads
- **Network bandwidth attacks**: Size limits don't control connection count

---

## 🗄️ SQL Injection Prevention

### ✅ What NestFlux Implements

NestFlux uses **Drizzle ORM** which provides automatic SQL injection protection through parameterized queries and type-safe query building.

### 🛡️ What It Prevents
- **Classic SQL injection**: All values are automatically parameterized
- **Union-based attacks**: Query structure is enforced by TypeScript
- **Boolean-based blind injection**: Parameters prevent logical manipulation
- **Time-based attacks**: No dynamic SQL construction allows timing attacks
- **Second-order injection**: Stored data is also safely parameterized on retrieval

### ⚠️ Raw Query Safety

For cases requiring raw SQL, Drizzle provides safe parameter binding:

```typescript
import { sql } from 'drizzle-orm';

// ✅ SAFE: Using parameterized raw queries
async complexQuery(userId: number, searchTerm: string) {
  return await this.query().execute(sql`
    SELECT u.*, COUNT(r.id) as role_count
    FROM user u
    LEFT JOIN user_role ur ON u.id = ur.user_id
    LEFT JOIN role r ON ur.role_id = r.id
    WHERE u.id = ${userId}
      AND u.name LIKE ${`%${searchTerm}%`}
    GROUP BY u.id
  `);
}

// ✅ SAFE: Using sql.raw with proper escaping
async dynamicOrderBy(column: string, direction: 'ASC' | 'DESC') {
  // Validate column name against whitelist
  const allowedColumns = ['name', 'email', 'createdAt'];
  if (!allowedColumns.includes(column)) {
    throw new BadRequestException('Invalid sort column');
  }

  return await this.query().execute(sql.raw(`
    SELECT * FROM user 
    ORDER BY ${column} ${direction}
  `));
}

// ❌ NEVER DO: String concatenation
async unsafeQuery(userInput: string) {
  // This is vulnerable to SQL injection
  return await this.query().execute(sql.raw(`
    SELECT * FROM user WHERE name = '${userInput}'
  `)); // DON'T DO THIS!
}
```

### ⚠️ What It Doesn't Prevent
- **Logic flaws**: Incorrect business logic can still expose data
- **Authorization bypasses**: SQL safety doesn't enforce access controls
- **Data exposure**: Overly broad queries can leak sensitive information
- **Performance attacks**: Complex queries can still cause DoS
- **NoSQL injection**: Only protects against SQL-based attacks

### 💡 Best Practices

**1. Always Use Query Builders:**
```typescript
// ✅ Preferred approach
const users = await db.select().from(userTable).where(eq(userTable.id, userId));

// ❌ Avoid raw SQL unless absolutely necessary
const users = await db.execute(sql`SELECT * FROM user WHERE id = ${userId}`);
```

**2. Validate Dynamic Elements:**
```typescript
// ✅ Whitelist approach for dynamic queries
const buildSortClause = (column: string) => {
  const allowedColumns = {
    'name': userTable.name,
    'email': userTable.email,
    'created': userTable.createdAt,
  };
  
  return allowedColumns[column] || userTable.createdAt;
};
```

---

## 🔧 Additional Security Considerations

### 🚨 What You Still Need

**🛡️ Request Body Validation with Zod:**

NestFlux uses Zod extensively for runtime validation of request information, ensuring data integrity and preventing malicious payloads:

```typescript
// Define validation schema
const USER_CREATE_SCHEMA = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  age: z.number().int().min(18).max(120),
  roles: z.array(z.string().uuid()).optional(),
});

// API endpoint definition
const CREATE_USER_ENDPOINT = {
  getPath: () => [],
  method: EndpointMethod.POST,
  bodyDto: USER_CREATE_SCHEMA,
  responseDto: USER_SCHEMA,
} satisfies EndpointDefinition;

// Controller implementation
@Post()
async createUser(
  @ValidatedBody(USER_CONTROLLER, 'create') body: z.infer<typeof USER_CREATE_SCHEMA>
) {
  // body is automatically validated and type-safe
  return this.userService.create(body);
}
```

**🛡️ What Zod Validation Prevents:**
- **Type confusion attacks**: Ensures data types match expectations
- **Buffer overflow**: Enforces string length and array size limits
- **Invalid data structures**: Rejects malformed objects and arrays
- **Business logic bypasses**: Enforces domain-specific validation rules

**⚠️ What It Doesn't Prevent:**
- **Logic bombs**: Malicious code in valid-looking data
- **Denial of service**: Large valid payloads can still cause issues
- **Advanced XSS**: Context-specific XSS vectors may still work
- **Social engineering**: Users providing valid but malicious data

---

## 🎯 Conclusion

NestFlux provides a solid foundation for web application security through multiple defense layers. However, security is not a one-time implementation but an ongoing process.

The built-in security measures protect against common attacks but should be supplemented with additional security practices, infrastructure-level protection, and regular security assessments based on your specific threat model and requirements.
