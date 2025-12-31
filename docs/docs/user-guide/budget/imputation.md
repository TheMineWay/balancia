---
sidebar_position: 3
---

# 📌 Budget Imputation

## ❓ What is Imputation

Imputation is the process of assigning (or allocating) a transaction to one or more budget segments. When you impute a transaction, you're tracking how that expense or income affects your budget plan.

**Key characteristics:**
- **Transaction Assignment**: Link a transaction to a budget segment
- **Percentage**: Specify what percentage of the transaction to impute
- **Reason**: Optionally provide a reason or note for the imputation

## 🎯 Basic Imputation

In the simplest case, you impute 100% of a transaction to a single segment:

**Example:**
- Transaction: $50 grocery shopping
- Imputation: 100% to "Food" segment
- Reason: "Weekly groceries"

## ✂️ Partial Imputation (Split within a Budget)

Sometimes a single transaction needs to be split across **multiple segments of the same budget**. This is where partial imputation becomes powerful.

**Example:**
- Transaction: $100 at a department store
- Imputation 1: 60% ($60) to "Clothing" segment - Reason: "New shirt and pants"
- Imputation 2: 40% ($40) to "Household" segment - Reason: "Kitchen utensils"

**Important Rule:** Within a **single budget**, the total imputation for a transaction cannot exceed 100%.

✅ **Valid:**
- 60% to Segment A + 40% to Segment B = 100% ✓

❌ **Invalid:**
- 70% to Segment A + 50% to Segment B = 120% ✗

## 🔄 Cross-Budget Imputation

A powerful feature of Balancia is the ability to impute the **same transaction to multiple budgets**. This is useful when you have several budgets running during the same period with different objectives.

**Key Rule:** You can impute **100% of a transaction to each budget** independently.

**Example Scenario:**
You have two budgets active in July 2026:
- **"2026 Annual Budget"** - Tracking yearly finances
- **"Summer Vacation Budget"** - Tracking vacation-related expenses

Transaction: $200 hotel booking in July

**Cross-Budget Imputation:**
- In "2026 Annual Budget": 100% to "Travel" segment
- In "Summer Vacation Budget": 100% to "Accommodation" segment

Both budgets track the full transaction independently, which makes sense because:
- Your annual budget needs to account for all $200 spent
- Your vacation budget also needs to account for all $200 spent

## 📝 Imputation Details

### Percentage
- Must be between 0% and 100%
- Within a single budget, sum cannot exceed 100%
- Across different budgets, each can receive up to 100%

### Reason
- Optional text field
- Helps explain why the transaction was imputed to this segment
- Useful for future reference and auditing

**Example Reasons:**
- "Weekly grocery shopping"
- "Gas for work commute"
- "Split with household items"
- "Part of vacation planning"

## 💡 Best Practices

1. **Be Specific with Reasons**: Clear reasons make budget reviews easier
2. **Split Accurately**: Take time to estimate percentages correctly
3. **Review Regularly**: Check imputed transactions to ensure accuracy
4. **Adjust as Needed**: Imputation can often be edited if you make a mistake
5. **Use Cross-Budget Wisely**: Only impute to multiple budgets when it truly serves different tracking purposes

## ⚠️ Common Mistakes

❌ **Exceeding 100% in a Single Budget**
- Don't impute more than 100% of a transaction within one budget

❌ **Forgetting to Impute**
- Transactions without imputation won't count toward your budget tracking

❌ **Too Many Splits**
- Splitting into too many tiny percentages can make tracking cumbersome

❌ **Unclear Reasons**
- Vague reasons like "stuff" don't help future review

> **Note:** Imputation is flexible and forgiving. You can typically adjust imputations after the fact, so don't worry about getting it perfect on the first try. The goal is to gain insight into your spending patterns and budget adherence.
