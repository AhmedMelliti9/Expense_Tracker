import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ExpenseSummary } from '../components/ExpenseSummary';
import type { Expense } from '../types/expense';

describe('ExpenseSummary Component', () => {
  it('displays $0.00 and 0 expenses when list is empty', () => {
    render(<ExpenseSummary expenses={[]} />);
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText(/0 visible expenses/i)).toBeInTheDocument();
  });

  it('calculates and formats the total of all visible expenses', () => {
    const expenses: Expense[] = [
      { id: '1', description: 'Train Ticket', amount: 45.5, category: 'Travel', date: '2026-03-01' },
      { id: '2', description: 'Keyboard', amount: 120.0, category: 'Equipment', date: '2026-03-02' },
      { id: '3', description: 'Lunch', amount: 15.25, category: 'Food', date: '2026-03-03' },
    ];

    render(<ExpenseSummary expenses={expenses} />);
    // 45.50 + 120.00 + 15.25 = 180.75
    expect(screen.getByText('$180.75')).toBeInTheDocument();
    expect(screen.getByText(/3 visible expenses/i)).toBeInTheDocument();
  });
});
