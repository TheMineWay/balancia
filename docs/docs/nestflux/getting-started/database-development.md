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

## 📋 Working with Tables

### Creating New Tables

To add a new table to your database schema:

1. **Create the table file** in the appropriate directory under `apps/server/src/database/schemas/main/tables/`
2. **Define the table structure** using Drizzle's MySQL table syntax with appropriate column types, constraints, and relationships
3. **Export the table and types** for TypeScript inference
4. **Add the export** to `main.schema.ts` to include it in the database schema
5. **Generate and apply migration** using `pnpm db:generate` followed by `pnpm db:migrate`

### Adding Columns

To add new columns to existing tables:

1. **Modify the table definition** by adding the new column definitions
2. **Consider default values** for existing records if the column is NOT NULL
3. **Add appropriate constraints** such as unique, foreign key, or check constraints
4. **Generate migration** to create the ALTER TABLE statements
5. **Review the generated SQL** to ensure it matches your expectations
6. **Apply the migration** to update your database structure

### Modifying Columns

To change existing column properties:

1. **Update the column definition** with new type, length, or constraint specifications
2. **Consider data compatibility** - ensure existing data can be converted to the new format
3. **Plan data migration** if the change requires transforming existing values
4. **Generate migration** which will create appropriate ALTER TABLE statements
5. **Test thoroughly** especially when changing data types or adding NOT NULL constraints

### Removing Columns

To remove columns from existing tables:

1. **Remove the column definition** from the table schema
2. **Consider data preservation** - ensure you don't need the data or have backed it up
3. **Update application code** to remove any references to the deleted column
4. **Generate migration** which will create DROP COLUMN statements
5. **Apply with caution** as this operation is irreversible and will permanently delete data

### Foreign Key Relationships

When working with relationships between tables:

1. **Define foreign key columns** with matching data types to the referenced primary key
2. **Add foreign key constraints** using Drizzle's foreignKey syntax
3. **Specify cascade behavior** for updates and deletes (CASCADE, RESTRICT, SET NULL)
4. **Ensure referenced tables exist** before creating the relationship
5. **Consider index creation** on foreign key columns for performance

**⚠️ Important**: Always consider data migration implications when making structural changes in production.

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

**Foreign Key Errors**:
- Ensure referenced tables exist
- Check column types match between tables
- Verify foreign key constraints are properly defined

## 📚 Advanced Resources

- [Drizzle ORM MySQL Guide](https://orm.drizzle.team/docs/get-started-mysql)
- [MySQL Data Types Reference](https://dev.mysql.com/doc/refman/8.0/en/data-types.html)

---

*This guide covers the fundamental patterns for database development in NestFlux. As your application grows, consider implementing additional patterns like database seeding, connection pooling optimization, and read/write replicas.*
