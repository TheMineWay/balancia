---
sidebar_position: 2
---

# 🛢️ Database Development

A comprehensive guide to working with the database layer in NestFlux using MySQL and Drizzle ORM.

## 🎯 Development Philosophy

NestFlux's database layer is built around modern development practices:

- **Type Safety**: Full TypeScript integration with compile-time validation
- **Schema-First**: Define your database structure in code, not SQL
- **Migration-Based**: Version-controlled database changes
- **Developer Experience**: Intuitive API with excellent tooling support
- **Code Organization**: Structured approach to table definitions and relationships

## 🏗️ Database Architecture

The database layer is organized within the server project (`apps/server`) with a clear structure:

```
apps/server/src/database/
├── schemas/
│   ├── main.schema.ts                 # Main schema export file
│   └── main/
│       └── tables/
│           └── identity/              # Folder organization
│               ├── user.table.ts
│               └── ...
├── services/                          # Database service layer
└── migrations/                        # Generated migration files
```

## ✏️ Editing Existing Tables

When you need to modify existing tables, follow these steps:

### Adding Columns

**Step 1**: Modify the table definition:

```typescript
// Before
export const userTable = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow(),
});

// After - adding avatar and phone columns
export const userTable = mysqlTable("user", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).unique(),
  name: varchar("name", { length: 100 }),
  avatarUrl: varchar("avatarUrl", { length: 500 }), // New column
  phoneNumber: varchar("phoneNumber", { length: 20 }), // New column
  createdAt: timestamp("createdAt").defaultNow(),
});
```

**Step 2**: Generate and apply migration:

```bash
pnpm db:generate  # Creates migration file
pnpm db:migrate   # Applies to database
```

**⚠️ Important**: Always consider data migration when removing columns in production.

## 🔄 Migration Commands

Drizzle provides two main commands for schema management:

### `pnpm db:generate`

**Purpose**: Generates migration files based on schema changes.

**When to use**:
- After modifying any schema files in `src/database/schemas/`
- When adding new tables, columns, or relationships
- When changing existing table structures

**What it does**:
- Compares current schema with existing migrations
- Creates new migration files in `apps/server/drizzle/`
- Generates SQL DDL statements for the changes

```bash
# From project root
pnpm db:generate

# Or from server directory
cd apps/server && pnpm db:generate
```

**Example Output**:
```
✓ Generated migration file: 0004_amazing_spiderman.sql
```

### `pnpm db:migrate`

**Purpose**: Applies pending migrations to your database.

**When to use**:
- After running `pnpm db:generate`
- When setting up a fresh database
- After pulling changes that include new migrations

**What it does**:
- Executes SQL migration files against your database
- Updates the database structure to match your schema
- Tracks which migrations have been applied

```bash
# From project root
pnpm db:migrate

# Or from server directory
cd apps/server && pnpm db:migrate
```

**Example Output**:
```
✓ Applied migration: 0004_amazing_spiderman.sql
Database is up to date!
```

## 🔄 Development Workflow

Here's the complete workflow for database development in NestFlux:

### 1. Plan Your Changes
- Identify what tables/columns you need to add/modify/remove
- Consider data migration implications for existing data
- Plan relationships between tables

### 2. Modify Schema Files
- Edit existing table files or create new ones
- Update relationships and constraints
- Export new tables in `main.schema.ts`

### 3. Generate Migration
```bash
pnpm db:generate
```
This creates a new migration file in `apps/server/drizzle/` with the SQL changes.

### 4. Review Generated SQL
Always check the generated migration file to ensure it matches your intentions:

```sql
-- Example migration file: 0005_brave_wolverine.sql
ALTER TABLE `user` ADD `avatarUrl` varchar(500);
ALTER TABLE `user` ADD `phoneNumber` varchar(20);
```

### 5. Apply Migration
```bash
pnpm db:migrate
```
This applies the changes to your database.

### 6. Update Application Code
- Update any services or controllers that use the modified tables
- Add new queries or update existing ones
- Update TypeScript types if needed (they're auto-generated from tables)

### 7. Test Changes
- Verify database changes work as expected
- Test any affected API endpoints
- Run unit tests to ensure nothing is broken

## 🚨 Best Practices

### Schema Organization
- **Group related tables** in folders (e.g., `identity/`, `blog/`, `commerce/`)
- **Use descriptive names** for tables and columns
- **Follow naming conventions**: snake_case for database, camelCase for TypeScript
- **Keep table files focused** - one table per file

### Migration Safety
- **Always review generated migrations** before applying
- **Test migrations on development data** first
- **Plan for rollback scenarios** in production
- **Never edit existing migration files** - create new ones

### Performance Considerations
- **Add indexes** for frequently queried columns
- **Use appropriate column types** and lengths
- **Consider partitioning** for very large tables
- **Avoid nullable foreign keys** when possible

### Development vs Production
- **Staging**: Always use migrations to test the deployment process
- **Production**: Only apply well-tested migrations with proper backup procedures

## 🔧 Troubleshooting

### Common Issues

**Schema Export Errors**:
```typescript
// Make sure all tables are exported in main.schema.ts
export { newTable } from "@database/schemas/main/tables/category/new.table";
```

**TypeScript Type Issues**:
```typescript
// Regenerate types by running migrations
pnpm db:migrate
// Types are automatically inferred from table definitions
```

**Foreign Key Errors**:
- Ensure referenced tables exist
- Check column types match between tables
- Verify foreign key constraints are properly defined

## 📚 Advanced Resources

- [Drizzle ORM MySQL Guide](https://orm.drizzle.team/docs/get-started-mysql)
- [MySQL Data Types Reference](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

---

*This guide covers the fundamental patterns for database development in NestFlux. As your application grows, consider implementing additional patterns like database seeding, connection pooling optimization, and read/write replicas.*
