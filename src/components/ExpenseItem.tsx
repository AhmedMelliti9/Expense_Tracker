import type { Expense } from '../types/expense';
import { formatCurrency } from '../utils/formatCurrency';

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Travel: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Food: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Equipment: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Software: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  Other: { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' },
};

export function ExpenseItem({ expense, onDelete }: ExpenseItemProps) {
  const categoryStyle = CATEGORY_COLORS[expense.category] || CATEGORY_COLORS.Other;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 bg-white rounded-xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h3 className="text-base font-semibold text-slate-900 truncate">
            {expense.description}
          </h3>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${categoryStyle.bg} ${categoryStyle.text} ${categoryStyle.border}`}
          >
            {expense.category}
          </span>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Date: <span className="font-medium text-slate-600">{expense.date}</span>
        </p>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="text-right">
          <span className="text-base sm:text-lg font-bold text-slate-900">
            {formatCurrency(expense.amount)}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete expense: ${expense.description}`}
          className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.8}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
