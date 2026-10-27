import { useState, useMemo } from 'react';
import type { Expense } from './types/expense';
import { ExpenseForm, type ExpenseFormDataInput } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';
import { FilterBar, type SortOption } from './components/FilterBar';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');

  const handleAddExpense = (expenseData: ExpenseFormDataInput) => {
    const newExpense: Expense = {
      id: crypto.randomUUID(),
      ...expenseData,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  // Filter and sort derived on each render — not stored as separate state
  const visibleExpenses = useMemo(() => {
    const filtered = expenses.filter((expense) => {
      if (selectedCategory === 'All') return true;
      return expense.category === selectedCategory;
    });

    return [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'date-desc':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'date-asc':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'amount-desc':
          return b.amount - a.amount;
        case 'amount-asc':
          return a.amount - b.amount;
        default:
          return 0;
      }
    });
  }, [expenses, selectedCategory, sortOption]);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="border-b border-slate-200 pb-5">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Expense Tracker
          </h1>
          <p className="text-slate-500 mt-1 text-sm">
            Manage and track your business expenses with ease.
          </p>
        </header>

        <main className="space-y-8">
          <ExpenseForm onAddExpense={handleAddExpense} />

          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortOption={sortOption}
            onSortChange={setSortOption}
          />

          <ExpenseSummary expenses={visibleExpenses} />

          <ExpenseList
            expenses={visibleExpenses}
            onDeleteExpense={handleDeleteExpense}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
