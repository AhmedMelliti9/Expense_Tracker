import type { Expense } from '../types/expense';
import { ExpenseItem } from './ExpenseItem';

interface ExpenseListProps {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
}

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-500">
        <p className="text-sm">No expenses to display.</p>
      </div>
    );
  }

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
