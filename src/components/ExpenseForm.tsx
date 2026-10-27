import { useState, type FormEvent } from 'react';
import { CATEGORIES, type Category } from '../types/expense';

export function ExpenseForm() {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [date, setDate] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Submission and validation logic will be added in subsequent tasks
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 md:p-8 space-y-6"
    >
      <div className="border-b border-slate-100 pb-4">
        <h2 className="text-xl font-semibold text-slate-900">Add New Expense</h2>
        <p className="text-sm text-slate-500 mt-1">
          Record your business expenses to keep accurate financial track.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Description Field */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Description
          </label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="e.g. Flight to conference, Web hosting renewal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm"
          />
        </div>

        {/* Amount Field */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Amount ($)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 text-sm font-medium">
              $
            </span>
            <input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm"
            />
          </div>
        </div>

        {/* Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | '')}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date Field */}
        <div className="md:col-span-2">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-slate-700 mb-1.5"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors text-sm"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm rounded-lg shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}
