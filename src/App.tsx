import { ExpenseForm } from './components/ExpenseForm';

function App() {
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

        <main>
          <ExpenseForm />
        </main>
      </div>
    </div>
  );
}

export default App
