import { CATEGORIES, type Category } from '../types/expense';

export interface ExpenseFormData {
  description: string;
  amount: string | number;
  category: string;
  date: string;
}

export type ExpenseFormErrors = Partial<Record<'description' | 'amount' | 'category' | 'date', string>>;

export interface ValidationResult {
  isValid: boolean;
  errors: ExpenseFormErrors;
}

export function validateExpense(data: ExpenseFormData): ValidationResult {
  const errors: ExpenseFormErrors = {};

  // 1. Description validation
  const trimmedDescription = (data.description ?? '').trim();
  if (!trimmedDescription) {
    errors.description = 'Description is required';
  } else if (trimmedDescription.length < 3) {
    errors.description = 'Description must be at least 3 characters';
  }

  // 2. Amount validation
  const amountStr = typeof data.amount === 'number' ? String(data.amount) : (data.amount ?? '').trim();
  if (!amountStr) {
    errors.amount = 'Amount is required';
  } else {
    const parsedAmount = Number(amountStr);
    if (Number.isNaN(parsedAmount)) {
      errors.amount = 'Amount must be a valid number';
    } else if (parsedAmount === 0) {
      errors.amount = 'Amount must be greater than zero';
    } else if (parsedAmount < 0) {
      errors.amount = 'Amount must be a positive number';
    }
  }

  // 3. Category validation
  const trimmedCategory = (data.category ?? '').trim();
  if (!trimmedCategory || !CATEGORIES.includes(trimmedCategory as Category)) {
    errors.category = 'Please select a category';
  }

  // 4. Date validation
  const trimmedDate = (data.date ?? '').trim();
  if (!trimmedDate) {
    errors.date = 'Date is required';
  } else {
    const [year, month, day] = trimmedDate.split('-').map(Number);
    if (!year || !month || !day) {
      errors.date = 'Invalid date format';
    } else {
      const selectedDate = new Date(year, month - 1, day);
      selectedDate.setHours(0, 0, 0, 0);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        errors.date = 'Date cannot be in the future';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
