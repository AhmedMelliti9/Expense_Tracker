import { useState } from 'react';
import type { Expense } from './types/expense';
import { ExpenseForm, type ExpenseFormDataInput } from './components/ExpenseForm';
import { ExpenseList } from './components/ExpenseList';
import { ExpenseSummary } from './components/ExpenseSummary';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

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
          <ExpenseSummary expenses={expenses} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </main>
      </div>
    </div>
  );
}

export default App;
