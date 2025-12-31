---
sidebar_position: 4
---

# 🤖 Automatic Imputation

## ❓ What is Automatic Imputation

Automatic imputation is a powerful feature that eliminates the need to manually assign every transaction to a budget segment. By assigning **categories to budget segments**, Balancia can automatically impute transactions to the appropriate segments based on their category.

**How it works:**
1. Assign one or more categories to a budget segment
2. When a transaction with that category is created or updated within the budget period
3. The transaction is automatically imputed to the matching segment(s)

## 🎯 Setting Up Automatic Imputation

To enable automatic imputation for a segment:

1. **Edit a budget segment**
2. **Assign categories** to the segment (e.g., "Food" segment → "Groceries", "Restaurants" categories)
3. **Save the segment**

From now on, any transaction categorized with those categories during the budget period will be automatically imputed to that segment.

## 🔄 When Automatic Imputation Occurs

Automatic imputation happens in two scenarios:

### 1. Transaction Creation

When you create a new transaction:
- **Date Check**: The transaction date falls within the budget period
- **Category Match**: The transaction category matches a segment's assigned categories
- **Auto-Imputation**: The transaction is automatically imputed to the matching segment(s)

**Example:**
- Budget: "January 2026" (Jan 1 - Jan 31)
- Segment: "Food" with categories: ["Groceries", "Restaurants"]
- You create a transaction: $50, date: Jan 15, 2026, category: "Groceries"
- **Result**: Transaction is automatically imputed to "Food" segment

### 2. Transaction Update (Category Change)

When you edit a transaction and change its category:
- **Delete Old**: Any existing automatic imputation is removed
- **Re-evaluate**: The system checks if the new category matches any segments
- **Re-impute**: If a match is found, a new automatic imputation is created

**Example:**
- Existing transaction: $50, category: "Groceries" (auto-imputed to "Food" segment)
- You edit it: change category to "Gas" (matches "Transportation" segment)
- **Result**: 
  - Old automatic imputation to "Food" is deleted
  - New automatic imputation to "Transportation" is created

## 🛡️ Manual Imputation Protection

**Important:** If a transaction already has a **manual imputation**, automatic imputation will **not** override it.

**Rule:** Manual imputations always take precedence over automatic imputations.

### Example Scenario

1. Transaction: $100, category: "Groceries"
2. **Auto-imputed** to "Food" segment (100%)
3. You **manually impute** 50% to "Food" and 50% to "Shared Expenses"
4. You change the category to "Restaurants"
5. **Result**: The manual imputation remains unchanged (automatic imputation does NOT apply)

This protection ensures you maintain full control when you've explicitly decided how to allocate a transaction.

## 🚫 Category Uniqueness Within a Budget

**Important Rule:** Within the same budget, a category can only be assigned to **one segment**.

This means:
- ✅ You can assign "Groceries" category to the "Food" segment
- ✅ You can assign "Restaurants" category to the "Food" segment
- ❌ You **cannot** assign "Groceries" category to both "Food" segment AND "Household" segment

**Why this restriction exists:**
- Ensures automatic imputation is **unambiguous** - the system always knows which segment to use
- Prevents conflicts and confusion about where transactions should be allocated
- Maintains clear budget structure and reporting

**Note:** You can assign the same category to segments in **different budgets**. The uniqueness rule only applies within a single budget.

## 📋 Use Cases

### Monthly Recurring Expenses

Set up automatic imputation for predictable expenses:
- **Rent/Mortgage** → "Housing" segment with "Rent" category
- **Utilities** → "Housing" segment with "Electricity", "Water", "Internet" categories
- **Subscriptions** → "Entertainment" segment with "Streaming", "Apps" categories

### Shopping Categories

Group related shopping categories:
- **Groceries & Dining** → "Food" segment with "Groceries", "Restaurants", "Cafes" categories
- **Clothing** → "Personal" segment with "Clothes", "Shoes", "Accessories" categories

### Mixed Budgets

For budgets covering multiple areas:
- **Essential Expenses** segment → "Rent", "Groceries", "Healthcare" categories
- **Discretionary** segment → "Entertainment", "Hobbies", "Travel" categories

## ⚠️ Important Considerations

### Date Boundaries

Automatic imputation only occurs if:
- The transaction date falls **within the budget period**
- A transaction dated outside the budget period will NOT be automatically imputed

### Category Changes

- Changing a transaction's category **triggers re-evaluation**
- Old automatic imputations are **deleted**
- New automatic imputations are **created** if categories match

### Manual Override

- Once you create a **manual imputation**, automatic imputation is **disabled** for that transaction
- To re-enable automatic imputation, you must **delete the manual imputation**

## 🎯 Best Practices

1. **Clear Category Mapping**: Assign categories to segments in a way that makes sense for your budgeting goals
2. **One Category Per Segment**: Remember that each category can only belong to one segment within a budget
3. **Review Regularly**: Periodically review automatic imputations to ensure they align with your actual spending patterns
4. **Use Manual When Needed**: For complex or exceptional transactions, manually impute instead of relying on automatic rules

## 💡 Benefits

- **⏱️ Time Saving**: Eliminate repetitive manual imputation for routine transactions
- **🎯 Consistency**: Ensure similar transactions are always categorized the same way
- **📊 Accuracy**: Reduce human error in budget tracking
- **🔄 Flexibility**: Change category assignments to adjust imputation rules globally
