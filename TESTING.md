# Manual Testing Documentation

This document records the manual test cases for the Expense Tracker application, verifying functional, non-functional, and security requirements.

---

## Test Cases Summary

| ID | Test Scenario | Target Feature | Expected Result | Status |
|---|---|---|---|---|
| TC-01 | Add a valid expense | FR-01, FR-05 | Expense is added to list, fields reset, total updates | PASS |
| TC-02 | Submit empty form | FR-07, NFR-01 | Inline error messages displayed for all 4 fields | PASS |
| TC-03 | Validate short & whitespace descriptions | FR-07, Security | Rejects < 3 characters and whitespace-only text | PASS |
| TC-04 | Validate zero and negative amounts | FR-07, Security | Rejects non-positive numbers with specific inline messages | PASS |
| TC-05 | Validate future date rejection | FR-07 | Rejects future dates: "Date cannot be in the future" | PASS |
| TC-06 | Delete an expense | FR-02, FR-04 | Expense removed from list, total spend updates | PASS |
| TC-07 | Filter expenses by category | FR-03, FR-04 | Only expenses matching category shown; total reflects visible only | PASS |
| TC-08 | Empty states (initial vs no filter match) | FR-06, NFR-02 | Displays distinct empty state messages and contextual actions | PASS |
| TC-09 | Sort expenses by date and amount | FR-08 | Reorders list correctly (newest, oldest, highest, lowest) | PASS |
| TC-10 | Currency formatting accuracy | NFR-03 | Displays two decimal places with dollar symbol ($) | PASS |

---

## Detailed Test Cases

### TC-01: Add a Valid Expense
- **Preconditions**: Application loaded in browser.
- **Steps**:
  1. Enter Description: `"High-speed internet router"`
  2. Enter Amount: `89.95`
  3. Select Category: `"Equipment"`
  4. Select Date: `Today's date`
  5. Click **Add Expense**.
- **Expected Result**:
  - The expense appears at the top of the expense list with description, formatted amount (`$89.95`), category badge, and date.
  - The form inputs clear.
  - The total spend in `ExpenseSummary` increases by `$89.95`.

### TC-02: Submit Empty Form
- **Preconditions**: Form fields are blank.
- **Steps**:
  1. Leave all fields empty.
  2. Click **Add Expense**.
- **Expected Result**:
  - Form submission is blocked.
  - Inline error below Description: `"Description is required"`.
  - Inline error below Amount: `"Amount is required"`.
  - Inline error below Category: `"Please select a category"`.
  - Inline error below Date: `"Date is required"`.
  - Input borders turn red.

### TC-03: Validate Short & Whitespace Descriptions
- **Preconditions**: Form loaded.
- **Steps**:
  1. Enter `"   "` (spaces only). Click **Add Expense**.
  2. Enter `"ab"` (2 characters). Click **Add Expense**.
- **Expected Result**:
  - Step 1 shows `"Description is required"`.
  - Step 2 shows `"Description must be at least 3 characters"`.
  - No expense is added.

### TC-04: Validate Zero and Negative Amounts
- **Preconditions**: Valid description, category, and date entered.
- **Steps**:
  1. Enter Amount: `0`. Click **Add Expense**.
  2. Enter Amount: `-25.50`. Click **Add Expense**.
- **Expected Result**:
  - For `0`: Displays inline error `"Amount must be greater than zero"`.
  - For `-25.50`: Displays inline error `"Amount must be a positive number"`.
  - Submission is blocked in both cases.

### TC-05: Validate Future Date Rejection
- **Preconditions**: Valid description, amount, and category entered.
- **Steps**:
  1. Pick a date 3 days into the future.
  2. Click **Add Expense**.
- **Expected Result**:
  - Displays inline error: `"Date cannot be in the future"`.
  - Submission is blocked.

### TC-06: Delete an Expense
- **Preconditions**: At least 2 expenses in the list (e.g. `$100.00` and `$50.00`, Total: `$150.00`).
- **Steps**:
  1. Click the trash/delete button on the `$50.00` item.
- **Expected Result**:
  - The `$50.00` item is removed from the list.
  - Total updates immediately to `$100.00`.
  - Visible count badge decrements to 1.

### TC-07: Filter Expenses by Category
- **Preconditions**: Add 1 `Travel` expense ($120.00) and 1 `Software` expense ($45.00). Total: `$165.00`.
- **Steps**:
  1. In the FilterBar, select category `"Travel"`.
- **Expected Result**:
  - Only the `Travel` expense is displayed in the list.
  - Total Spend card updates to show `$120.00` (reflecting only visible expenses per FR-04).
  - Visible count shows `1 visible expense`.
  2. Change category back to `"All Categories"`.
  - Both expenses appear and total reflects `$165.00`.

### TC-08: Distinguish Empty States
- **Preconditions**: New session with 0 expenses.
- **Steps**:
  1. Observe the expense list area with no entries.
- **Expected Result**:
  - Displays Empty State 1: `"No expenses added yet"` with message `"Add your first expense using the form above to start tracking your business spending."`
- **Steps**:
  2. Add 1 `Food` expense.
  3. Filter by `"Software"`.
- **Expected Result**:
  - Displays Empty State 2: `"No expenses match this filter"` with message `"No expenses found for category “Software”."`
  - A `"Reset Filter"` button is displayed.
  4. Click `"Reset Filter"`. Filter resets to All Categories and shows the Food item.

### TC-09: Sort Expenses by Date and Amount
- **Preconditions**: Add 3 expenses:
  - Expense A: $20, Date: 2026-01-01
  - Expense B: $100, Date: 2026-01-05
  - Expense C: $50, Date: 2026-01-03
- **Steps & Expected Results**:
  1. Sort by `Date (Newest first)`: B (Jan 5) → C (Jan 3) → A (Jan 1).
  2. Sort by `Date (Oldest first)`: A (Jan 1) → C (Jan 3) → B (Jan 5).
  3. Sort by `Amount (Highest first)`: B ($100) → C ($50) → A ($20).
  4. Sort by `Amount (Lowest first)`: A ($20) → C ($50) → B ($100).

### TC-10: Currency Formatting Accuracy
- **Preconditions**: Test different amount formats.
- **Steps**:
  1. Add an expense of `1234.5`.
  2. Add an expense of `10`.
- **Expected Result**:
  - `1234.5` is rendered as `$1,234.50` (with comma and 2 decimal digits).
  - `10` is rendered as `$10.00`.
  - All currency displays consistently adhere to the `$X,XXX.XX` standard.
