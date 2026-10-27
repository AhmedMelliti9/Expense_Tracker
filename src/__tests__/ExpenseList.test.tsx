import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ExpenseList } from '../components/ExpenseList';
import type { Expense } from '../types/expense';

describe('ExpenseList Component', () => {
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

  it('renders empty message when no expenses exist', () => {
    render(<ExpenseList expenses={[]} onDeleteExpense={vi.fn()} />);
    expect(screen.getByText('No expenses to display.')).toBeInTheDocument();
  });

  it('renders all expenses correctly', () => {
    render(<ExpenseList expenses={sampleExpenses} onDeleteExpense={vi.fn()} />);

    expect(screen.getByText('Office Chair')).toBeInTheDocument();
    expect(screen.getByText('Client Dinner')).toBeInTheDocument();
    expect(screen.getByText('Equipment')).toBeInTheDocument();
    expect(screen.getByText('Food')).toBeInTheDocument();
    expect(screen.getByText('$150.00')).toBeInTheDocument();
    expect(screen.getByText('$85.50')).toBeInTheDocument();
  });

  it('calls onDeleteExpense when delete button is clicked', () => {
    const handleDelete = vi.fn();
    render(<ExpenseList expenses={sampleExpenses} onDeleteExpense={handleDelete} />);

    const deleteButtons = screen.getAllByRole('button', { name: /delete expense/i });
    fireEvent.click(deleteButtons[0]);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith('exp-1');
  });
});
