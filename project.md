# Project Name: Expense Tracker



## Problem Statement

A small business owner tracks business expenses manually in a spreadsheet. The spreadsheet is hard to filter, hard to total by category, and takes too long to update. She wants a simple browser-based expense tracker where she can add expenses with a category and date, see the total spend, filter by category, and remove incorrect entries.

She does not need the data to persist between sessions yet.

Your job is to build this as a clean, well-structured React application.

---

## Functional Requirements

```
FR-01: Users can add an expense with: description, amount (positive number), category, and date.
FR-02: Users can delete an expense.
FR-03: Users can filter expenses by category.
FR-04: The dashboard displays the total amount of all visible (filtered) expenses.
FR-05: Each expense displays its description, amount (formatted as currency), category, and date.
FR-06: The expense list shows an appropriate empty state when no expenses match the current filter.
FR-07: Form inputs are validated before submission — invalid submissions are rejected with clear error messages.
FR-08: Users can sort expenses by date (newest first, oldest first) or by amount (highest first, lowest first).
```

---

## Non-Functional Requirements

```
NFR-01: Form validation errors are visible to the user inline (next to the relevant field).
NFR-02: The empty state clearly distinguishes between "no expenses added yet" and "no expenses match this filter".
NFR-03: Currency amounts are always displayed with two decimal places and a currency symbol.
NFR-04: The code is readable, consistently named, and free of dead code.
NFR-05: Components have single, clear responsibilities.
```

---

## Technical Requirements

### You must use:

- React (Vite)
- TypeScript
- Tailwind CSS
- Vitest + React Testing Library (for unit tests)
- Git (with feature branches this week)

### You must NOT use:

- A form library (react-hook-form, Formik, etc.)
- An external state management library
- A component library
- A backend or persistence of any kind
- Date picker libraries — use a native HTML `<input type="date">`

### Why these constraints?

You must understand how controlled forms work before using a library that hides the mechanism. Validation logic is something you will write by hand many times in your career — understanding it now prevents confusion later.

---

## Suggested Project Structure

```
02-interactive-ui/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── types/
    │   └── expense.ts
    ├── components/
    │   ├── ExpenseForm.tsx
    │   ├── ExpenseList.tsx
    │   ├── ExpenseItem.tsx
    │   ├── ExpenseSummary.tsx
    │   └── FilterBar.tsx
    ├── utils/
    │   ├── formatCurrency.ts
    │   └── validateExpense.ts
    └── __tests__/
        ├── formatCurrency.test.ts
        └── validateExpense.test.ts
```

### Why this structure?

- Validation logic lives in `utils/` as a pure function — this makes it independently testable without rendering any component
- `FilterBar` is its own component because filtering is a distinct concern from displaying or adding expenses
- `ExpenseSummary` is separate because totals are a display concern separate from the list itself
- Tests live in `__tests__/` next to the source — not inside `components/`

---


github repo to push : https://github.com/AhmedMelliti9/Expense_Tracker.git'
important rule : do do not push directly to main

## Implementation Tasks

### Task 1 — Project Setup

- Initialize a new Vite + React + TypeScript project
- Install and configure Tailwind CSS
- Install Vitest and React Testing Library
- Configure Vitest in `vite.config.ts`
- Initialize Git, make initial commit

Commit: `"chore: initialize project with Vitest and React Testing Library"`

---

### Task 2 — Define Types

Define the `Expense` type and the `Category` type in `src/types/expense.ts`.

Categories should be a fixed set of options (e.g., Travel, Food, Equipment, Software, Other).

Think: What TypeScript feature lets you represent a fixed set of string values?

Commit: `"feat: define expense and category types"`

---

### Task 3 — Build the Expense Form (Display Only)

Build `ExpenseForm.tsx` as a controlled form with:

- Description input (text)
- Amount input (number)
- Category select
- Date input

At this stage, just render the form — no submission, no validation.

Every input must be controlled (its value is driven by React state, not the DOM).

Commit: `"feat: add controlled expense form (display only)"`

---

### Task 4 — Add Validation Logic

In `src/utils/validateExpense.ts`, write a pure validation function that takes the form values and returns either a success result or a map of field-level error messages.

Validation rules:
- Description: required, at least 3 characters
- Amount: required, must be a positive number greater than 0
- Category: required, must be one of the defined categories
- Date: required, must not be in the future

Write unit tests for `validateExpense` in `__tests__/validateExpense.test.ts` before wiring it into the form.

Test cases to cover:
- All fields valid — returns success
- Empty description — returns error
- Description too short — returns error
- Amount of zero — returns error
- Negative amount — returns error
- Non-numeric amount — returns error
- Future date — returns error
- Missing category — returns error

Commit: `"feat: add expense validation logic with unit tests"`

---

### Task 5 — Wire Validation Into the Form

Connect `validateExpense` to the form submission handler.

When the user submits:
- Run validation
- If errors exist, display them inline next to each field and do not submit
- If valid, call a handler passed as a prop and clear the form

Error messages should appear below the relevant input field.

Commit: `"feat: connect validation to form, show inline errors"`

---

### Task 6 — Build the Expense List

Build `ExpenseList.tsx` and `ExpenseItem.tsx`.

Wire up `App.tsx` to hold expenses in state and pass them to `ExpenseList`.

Wire up the delete handler.

Commit: `"feat: add expense list and deletion"`

---

### Task 7 — Build the Summary

Build `ExpenseSummary.tsx` to display the total amount.

The total should always reflect only the currently visible (filtered) expenses, not all expenses.

Write a utility `formatCurrency.ts` and unit test it:
- `formatCurrency(10)` → `"$10.00"`
- `formatCurrency(1234.5)` → `"$1,234.50"`
- `formatCurrency(0)` → `"$0.00"`
- `formatCurrency(-5)` — decide and document how this is handled

Commit: `"feat: add expense summary with currency formatting"`

---

### Task 8 — Add Filtering and Sorting

Build `FilterBar.tsx` with:
- A category filter (select, with "All" as default)
- A sort control (by date newest/oldest, by amount highest/lowest)

Filter and sort logic should be computed from state in `App.tsx` — not stored as separate state.

Think carefully: Should the filtered/sorted list be stored in state, or derived on each render?

Commit: `"feat: add category filter and sort controls"`

---

### Task 9 — Empty States

Implement two distinct empty states:

1. No expenses have been added at all
2. Expenses exist but none match the current filter

The messages should be different and contextually helpful.

Commit: `"feat: implement distinct empty states"`

---

### Task 10 — Code Review and Documentation

- Read through all components and utils
- Ensure consistent naming
- Remove all dead code
- Write a project `README.md`
- Ensure tests pass: `npm run test`

Commit: `"docs: add README and finalize code"`

---

## Error Handling Requirements

| Scenario | Expected Behavior |
|---|---|
| Description is empty | Inline error: "Description is required" |
| Description too short | Inline error: "Description must be at least 3 characters" |
| Amount is zero | Inline error: "Amount must be greater than zero" |
| Amount is negative | Inline error: "Amount must be a positive number" |
| Date is in the future | Inline error: "Date cannot be in the future" |
| Category not selected | Inline error: "Please select a category" |

### Key lesson this week:

Error handling in a UI means two things:

1. **Validation errors** — the user gave you bad data. Show them clearly. Do not crash. Do not silently ignore.
2. **Unexpected errors** — something broke that should not have. At this stage you do not have these yet, but recognize the distinction.

---

## Testing Requirements

### Required tests this week:

**Unit tests — `validateExpense.test.ts`**

- Every validation rule must have at least one passing test and one failing test
- Test edge cases: 0 amount, empty string, whitespace-only string

**Unit tests — `formatCurrency.test.ts`**

- `formatCurrency` must be tested with normal values, zero, large numbers, and decimals

### Running tests:

```
npm run test
```

All tests must pass before you commit.

### Manual testing:

Document at least 8 manual test cases in `TESTING.md`.

---

## Git Requirements

This week introduces **feature branches**.

### Required workflow:

```
git checkout -b feature/expense-form
# ... work ...
git add <files>
git commit -m "feat: add controlled expense form"
git checkout main
git merge feature/expense-form
```

Use a new branch for each significant feature:

- `feature/expense-form`
- `feature/validation`
- `feature/expense-list`
- `feature/filter-sort`
- `feature/empty-states`

### Rules:

- Never commit directly to `main` for feature work
- Each commit should represent one logical unit of change
- All tests must pass before merging a branch

---

## Security Requirements

**Input Validation (reinforced from Project 01)**

- Trim whitespace from all string inputs before validation
- The amount must be validated as a number — do not trust the string value from the input
- Categories must match the defined set — do not accept arbitrary strings

**New concept this week:**

**Defense against unexpected input** — even in a pure frontend application, users can manipulate form values. Always validate before using data.

---


---

## Stretch Goals

```
Optional:
- Add a monthly summary: group expenses by month and show a total per month
- Add a bar chart visualization (using only HTML/CSS/Tailwind — no chart library)
- Allow editing an existing expense inline
- Add keyboard accessibility: all interactive elements reachable by Tab key

Do NOT implement:
- Persistence of any kind
- Routing
- External chart libraries
- Backend integration
```

---

## Definition of Done

```
[ ] All functional requirements (FR-01 through FR-08) are met
[ ] Form validation prevents invalid submissions
[ ] Inline error messages appear next to the relevant field
[ ] Both empty states are implemented and contextually correct
[ ] Total amount reflects the filtered list only
[ ] Currency is always formatted with two decimal places
[ ] Unit tests for validateExpense cover all rules (pass and fail cases)
[ ] Unit tests for formatCurrency cover normal values, zero, and large numbers
[ ] All tests pass: npm run test
[ ] TESTING.md documents manual test cases
[ ] Feature branches were used for each major feature
[ ] No commented-out code exists
[ ] Project README.md exists
[ ] Debugging exercise is completed and answers are written down
```



