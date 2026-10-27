import { describe, it, expect } from 'vitest';
import { validateExpense, type ExpenseFormData } from '../utils/validateExpense';

describe('validateExpense', () => {
  const getTodayString = (): string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getFutureDateString = (): string => {
    const future = new Date();
    future.setDate(future.getDate() + 5);
    const year = future.getFullYear();
    const month = String(future.getMonth() + 1).padStart(2, '0');
    const day = String(future.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const validData: ExpenseFormData = {
    description: 'Team Lunch',
    amount: '45.50',
    category: 'Food',
    date: getTodayString(),
  };

  it('returns success when all fields are valid', () => {
    const result = validateExpense(validData);
    expect(result.isValid).toBe(true);
    expect(result.errors).toEqual({});
  });

  describe('Description validation', () => {
    it('returns error when description is empty', () => {
      const result = validateExpense({ ...validData, description: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.description).toBe('Description is required');
    });

    it('returns error when description is whitespace only', () => {
      const result = validateExpense({ ...validData, description: '    ' });
      expect(result.isValid).toBe(false);
      expect(result.errors.description).toBe('Description is required');
    });

    it('returns error when description is too short (less than 3 chars)', () => {
      const result = validateExpense({ ...validData, description: 'Hi' });
      expect(result.isValid).toBe(false);
      expect(result.errors.description).toBe('Description must be at least 3 characters');
    });

    it('passes when description is exactly 3 characters', () => {
      const result = validateExpense({ ...validData, description: 'Gas' });
      expect(result.errors.description).toBeUndefined();
    });
  });

  describe('Amount validation', () => {
    it('returns error when amount is empty', () => {
      const result = validateExpense({ ...validData, amount: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toBe('Amount is required');
    });

    it('returns error when amount is zero (as string)', () => {
      const result = validateExpense({ ...validData, amount: '0' });
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toBe('Amount must be greater than zero');
    });

    it('returns error when amount is zero (as number)', () => {
      const result = validateExpense({ ...validData, amount: 0 });
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toBe('Amount must be greater than zero');
    });

    it('returns error when amount is negative', () => {
      const result = validateExpense({ ...validData, amount: '-15.00' });
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toBe('Amount must be a positive number');
    });

    it('returns error when amount is non-numeric', () => {
      const result = validateExpense({ ...validData, amount: 'abc' });
      expect(result.isValid).toBe(false);
      expect(result.errors.amount).toBe('Amount must be a valid number');
    });

    it('passes with positive integer or decimal amount', () => {
      const result = validateExpense({ ...validData, amount: '120.75' });
      expect(result.errors.amount).toBeUndefined();
    });
  });

  describe('Category validation', () => {
    it('returns error when category is missing', () => {
      const result = validateExpense({ ...validData, category: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.category).toBe('Please select a category');
    });

    it('returns error when category is an arbitrary invalid string', () => {
      const result = validateExpense({ ...validData, category: 'InvalidCategory' });
      expect(result.isValid).toBe(false);
      expect(result.errors.category).toBe('Please select a category');
    });

    it('passes for valid categories in CATEGORIES', () => {
      const categories = ['Travel', 'Food', 'Equipment', 'Software', 'Other'];
      categories.forEach((cat) => {
        const result = validateExpense({ ...validData, category: cat });
        expect(result.errors.category).toBeUndefined();
      });
    });
  });

  describe('Date validation', () => {
    it('returns error when date is missing', () => {
      const result = validateExpense({ ...validData, date: '' });
      expect(result.isValid).toBe(false);
      expect(result.errors.date).toBe('Date is required');
    });

    it('returns error when date is in the future', () => {
      const result = validateExpense({ ...validData, date: getFutureDateString() });
      expect(result.isValid).toBe(false);
      expect(result.errors.date).toBe('Date cannot be in the future');
    });

    it('passes when date is today', () => {
      const result = validateExpense({ ...validData, date: getTodayString() });
      expect(result.errors.date).toBeUndefined();
    });

    it('passes when date is in the past', () => {
      const result = validateExpense({ ...validData, date: '2023-01-15' });
      expect(result.errors.date).toBeUndefined();
    });
  });
});
