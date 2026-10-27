import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseList } from '../components/ExpenseList';
import type { Expense } from '../types/expense';

describe('ExpenseList Component Empty States and Rendering', () => {
  const sampleExpenses: Expense[] = [
    {
      id: 'exp-1',
      description: 'Office Chair',
      amount: 150.0,
      category: 'Equipment',
      date: '2026-03-01',
    },
    {
      id: 'exp-2',
      description: 'Client Dinner',
      amount: 85.5,
      category: 'Food',
      date: '2026-03-02',
    },
  ];

  it('renders distinct empty state 1 when no expenses have been added at all', () => {
    render(
      <ExpenseList
        expenses={[]}
        totalExpensesCount={0}
        onDeleteExpense={vi.fn()}
      />
    );

    expect(screen.getByText('No expenses added yet')).toBeInTheDocument();
    expect(
      screen.getByText(/add your first expense using the form above/i)
    ).toBeInTheDocument();
  });

  it('renders distinct empty state 2 when expenses exist but none match the filter', () => {
    const handleReset = vi.fn();
    render(
      <ExpenseList
        expenses={[]}
        totalExpensesCount={3}
        selectedCategory="Software"
        onDeleteExpense={vi.fn()}
        onClearFilter={handleReset}
      />
    );

    expect(screen.getByText('No expenses match this filter')).toBeInTheDocument();
    expect(
      screen.getByText(/no expenses found for category “Software”/i)
    ).toBeInTheDocument();

    const resetBtn = screen.getByRole('button', { name: /reset filter/i });
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(handleReset).toHaveBeenCalledTimes(1);
  });

  it('renders expenses when matching items exist', () => {
    const handleDelete = vi.fn();
    render(
      <ExpenseList
        expenses={sampleExpenses}
        totalExpensesCount={2}
        onDeleteExpense={handleDelete}
      />
    );

    expect(screen.getByText('Office Chair')).toBeInTheDocument();
    expect(screen.getByText('Client Dinner')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('$85.50')).toBeInTheDocument();

    const deleteButtons = screen.getAllByRole('button', { name: /delete expense/i });
    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith('exp-1');
  });
});
