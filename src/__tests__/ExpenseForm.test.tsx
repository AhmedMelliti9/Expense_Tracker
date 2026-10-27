import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExpenseForm } from '../components/ExpenseForm';

describe('ExpenseForm Component', () => {
  it('displays inline errors when submitting an empty form', () => {
    const handleAdd = vi.fn();
    render(<ExpenseForm onAddExpense={handleAdd} />);

    const submitBtn = screen.getByRole('button', { name: /add expense/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText('Description is required')).toBeInTheDocument();
    expect(screen.getByText('Amount is required')).toBeInTheDocument();
    expect(screen.getByText('Please select a category')).toBeInTheDocument();
    expect(screen.getByText('Date is required')).toBeInTheDocument();
    expect(handleAdd).not.toHaveBeenCalled();
  });

  it('displays inline error when amount is zero or negative', async () => {
    const user = userEvent.setup();
    render(<ExpenseForm />);

    const amountInput = screen.getByLabelText(/amount/i);
    const submitBtn = screen.getByRole('button', { name: /add expense/i });

    await user.type(amountInput, '0');
    await user.click(submitBtn);

    expect(screen.getByText('Amount must be greater than zero')).toBeInTheDocument();

    await user.clear(amountInput);
    await user.type(amountInput, '-25');
    await user.click(submitBtn);

    expect(screen.getByText('Amount must be a positive number')).toBeInTheDocument();
  });

  it('submits valid data, clears fields, and calls onAddExpense', async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<ExpenseForm onAddExpense={handleAdd} />);

    const descInput = screen.getByLabelText(/description/i);
    const amountInput = screen.getByLabelText(/amount/i);
    const categorySelect = screen.getByLabelText(/category/i);
    const dateInput = screen.getByLabelText(/date/i);
    const submitBtn = screen.getByRole('button', { name: /add expense/i });

    await user.type(descInput, 'Software Subscription');
    await user.type(amountInput, '49.99');
    await user.selectOptions(categorySelect, 'Software');
    await user.type(dateInput, '2026-01-10');

    await user.click(submitBtn);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith({
      description: 'Software Subscription',
      amount: 49.99,
      category: 'Software',
      date: '2026-01-10',
    });

    // Form should be cleared
    expect(descInput).toHaveValue('');
    expect(amountInput).toHaveValue(null);
    expect(categorySelect).toHaveValue('');
    expect(dateInput).toHaveValue('');
  });
});
