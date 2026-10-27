import type { Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  totalExpensesCount: number;
  selectedCategory?: string;
  onDeleteExpense: (id: string) => void;
  onClearFilter?: () => void;
}

export function ExpenseList({
  expenses,
  totalExpensesCount,
  selectedCategory = 'All',
  onDeleteExpense,
  onClearFilter,
}: ExpenseListProps) {
  // Empty State 1: No expenses have been added at all
  if (totalExpensesCount === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          No expenses added yet
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          Add your first expense using the form above to start tracking your business spending.
        </p>
      </div>
    );
  }

  // Empty State 2: Expenses exist, but none match the current filter
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-800">
          No expenses match this filter
        </h3>
        <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
          No expenses found for category &ldquo;{selectedCategory}&rdquo;. Try selecting a different category or resetting the filter.
        </p>
        {onClearFilter && (
          <button
            type="button"
            onClick={onClearFilter}
            className="mt-4 inline-flex items-center px-4 py-2 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
          >
            Reset Filter
          </button>
        )}
      </div>
    );
  }

  // Active populated list
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between pb-1">
        <h2 className="text-lg font-semibold text-slate-900">
          Expenses ({expenses.length})
        </h2>
      </div>
      <div className="space-y-2.5">
        {expenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            onDelete={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}
