import { useState, type FormEvent } from 'react';
import { CATEGORIES, type Category } from '../types/expense';
import { validateExpense, type ExpenseFormErrors } from '../utils/validateExpense';

export interface ExpenseFormDataInput {
  description: string;
  amount: number;
  category: Category;
  date: string;
}

interface ExpenseFormProps {
  onAddExpense?: (expense: ExpenseFormDataInput) => void;
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category | ''>('');
  const [date, setDate] = useState('');
  const [errors, setErrors] = useState<ExpenseFormErrors>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = validateExpense({
      description,
      amount,
      category,
      date,
    });

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    if (onAddExpense) {
      onAddExpense({
        description: description.trim(),
        amount: Number(amount),
        category: category as Category,
        date,
      });
    }

    // Reset form fields
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    if (errors.description) {
      setErrors((prev) => ({ ...prev, description: undefined }));
    }
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleCategoryChange = (value: Category | '') => {
    setCategory(value);
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  const handleDateChange = (value: string) => {
    setDate(value);
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: undefined }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
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
            onChange={(e) => handleDescriptionChange(e.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'description-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 focus:outline-none transition-colors text-sm ${
              errors.description
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.description && (
            <p id="description-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.description}
            </p>
          )}
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
              onChange={(e) => handleAmountChange(e.target.value)}
              aria-invalid={Boolean(errors.amount)}
              aria-describedby={errors.amount ? 'amount-error' : undefined}
              className={`w-full pl-8 pr-4 py-2.5 rounded-lg border text-slate-900 placeholder-slate-400 focus:outline-none transition-colors text-sm ${
                errors.amount
                  ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                  : 'border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
              }`}
            />
          </div>
          {errors.amount && (
            <p id="amount-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.amount}
            </p>
          )}
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
            onChange={(e) => handleCategoryChange(e.target.value as Category | '')}
            aria-invalid={Boolean(errors.category)}
            aria-describedby={errors.category ? 'category-error' : undefined}
            className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 bg-white focus:outline-none transition-colors text-sm ${
              errors.category
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p id="category-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.category}
            </p>
          )}
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
            onChange={(e) => handleDateChange(e.target.value)}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? 'date-error' : undefined}
            className={`w-full md:w-1/2 px-4 py-2.5 rounded-lg border text-slate-900 focus:outline-none transition-colors text-sm ${
              errors.date
                ? 'border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500'
                : 'border-slate-300 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500'
            }`}
          />
          {errors.date && (
            <p id="date-error" className="mt-1.5 text-xs text-red-600 font-medium">
              {errors.date}
            </p>
          )}
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
