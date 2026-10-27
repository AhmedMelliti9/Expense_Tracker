import type { Expense } from '../types/expense';
import { formatCurrency } from '../utils/formatCurrency';

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900 rounded-2xl p-6 sm:p-7 text-white shadow-md relative overflow-hidden">
      {/* Subtle decorative background circle */}
      <div className="absolute -right-8 -bottom-8 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-indigo-200">
            Total Spend
          </span>
          <p className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-white">
            {formatCurrency(total)}
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-xs px-3.5 py-1.5 rounded-lg border border-white/10 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium text-slate-200">
            {expenses.length} {expenses.length === 1 ? 'visible expense' : 'visible expenses'}
          </span>
        </div>
      </div>
    </div>
  );
}
