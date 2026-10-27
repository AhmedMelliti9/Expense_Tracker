# Expense Tracker

A modern, responsive, and robust browser-based Expense Tracker built with React, TypeScript, and Tailwind CSS. Designed to help small business owners quickly record, categorize, sort, and analyze business expenditures with zero external state management or form libraries.

---

## Features

- **Controlled Expense Form**: Seamlessly record expenses with description, positive numeric amount, category, and date.
- **Client-Side Defense & Validation**: Strict inline input validation for all fields before submission:
  - Description: trimmed, required, minimum 3 characters.
  - Amount: required, strictly positive number greater than zero.
  - Category: required, strictly constrained to defined business categories.
  - Date: required, prevents future date entries.
- **Dynamic Category Filtering**: Filter expenses by category with immediate UI updates.
- **Multi-Criteria Sorting**: Sort visible expenses by date (newest/oldest) or amount (highest/lowest).
- **Reactive Expense Summary**: Live dashboard total dynamically reflects visible/filtered expenses formatted to standard currency (`$X,XXX.XX`).
- **Contextual Empty States**: Distinct visual feedback distinguishing between "no expenses recorded yet" and "no expenses match the active filter".
- **Single-Click Deletion**: Remove entries cleanly with automatic recalculation of visible totals.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- **Version Control**: Git (Feature branch workflow)

---

## Project Structure

```
Expense Tracker/
├── src/
│   ├── components/
│   │   ├── ExpenseForm.tsx        # Controlled form with inline validation
│   │   ├── ExpenseItem.tsx        # Individual expense card with delete action
│   │   ├── ExpenseList.tsx        # List container with contextual empty states
│   │   ├── ExpenseSummary.tsx     # Dynamic summary card for visible totals
│   │   └── FilterBar.tsx          # Category filter and sorting controls
│   ├── types/
│   │   └── expense.ts             # Expense and Category type definitions
│   ├── utils/
│   │   ├── formatCurrency.ts      # USD currency formatter utility
│   │   └── validateExpense.ts     # Pure validation logic with defensive checks
│   ├── __tests__/
│   │   ├── ExpenseForm.test.tsx   # Form component and inline validation tests
│   │   ├── ExpenseList.test.tsx   # Empty states & list rendering tests
│   │   ├── ExpenseSummary.test.tsx# Total calculation tests
│   │   ├── FilterBar.test.tsx     # Filter and sort interaction tests
│   │   ├── formatCurrency.test.ts # Currency utility tests
│   │   └── validateExpense.test.ts# Validation rules & edge-case unit tests
│   ├── App.tsx                    # Main app state and derived calculations
│   ├── index.css                  # Tailwind CSS configuration
│   ├── main.tsx                   # Application entry point
│   └── setupTests.ts              # Testing library setup
├── TESTING.md                     # Manual test documentation (10 scenarios)
├── tsconfig.json                  # TypeScript project references
├── tsconfig.app.json              # App compiler configuration
├── vite.config.ts                 # Vite, Tailwind, and Vitest configuration
└── package.json                   # Project scripts and dependencies
```

---

## Getting Started

### Prerequisites

- Node.js (version 18 or later recommended)
- npm

### Installation

```bash
git clone https://github.com/AhmedMelliti9/Expense_Tracker.git
cd "Expense Tracker"
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open your browser at the local URL indicated in the terminal (typically `http://localhost:5173`).

### Building for Production

```bash
npm run build
```

---

## Running Tests

Run the Vitest test suite once:

```bash
npm run test
```

Run tests in watch mode during development:

```bash
npm run test:watch
```

For manual testing procedures and test case matrices, refer to [TESTING.md](./TESTING.md).

---

## Git Workflow

Feature branches were used for each milestone:
1. `feature/expense-form`: Tasks 2 & 3 (Types and Controlled Form)
2. `feature/validation`: Tasks 4 & 5 (Validation Logic & Inline Errors)
3. `feature/expense-list`: Tasks 6 & 7 (Expense List, Deletion, Summary & Currency Formatter)
4. `feature/filter-sort`: Task 8 (Category Filter and Sort Controls)
5. `feature/empty-states`: Task 9 (Distinct Empty States)
