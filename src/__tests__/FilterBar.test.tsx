import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../components/FilterBar';

describe('FilterBar Component', () => {
  it('renders all categories and sort options correctly', () => {
    render(
      <FilterBar
        selectedCategory="All"
        onCategoryChange={vi.fn()}
        sortOption="date-desc"
        onSortChange={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/filter by category/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'All Categories' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Travel' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Food' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Equipment' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Software' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Other' })).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'Date (Newest first)' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Date (Oldest first)' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Amount (Highest first)' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Amount (Lowest first)' })).toBeInTheDocument();
  });

  it('triggers onCategoryChange when category is selected', () => {
    const handleCategory = vi.fn();
    render(
      <FilterBar
        selectedCategory="All"
        onCategoryChange={handleCategory}
        sortOption="date-desc"
        onSortChange={vi.fn()}
      />
    );

    const categorySelect = screen.getByLabelText(/filter by category/i);
    fireEvent.change(categorySelect, { target: { value: 'Software' } });

    expect(handleCategory).toHaveBeenCalledTimes(1);
    expect(handleCategory).toHaveBeenCalledWith('Software');
  });

  it('triggers onSortChange when sort option is selected', () => {
    const handleSort = vi.fn();
    render(
      <FilterBar
        selectedCategory="All"
        onCategoryChange={vi.fn()}
        sortOption="date-desc"
        onSortChange={handleSort}
      />
    );

    const sortSelect = screen.getByLabelText(/sort by/i);
    fireEvent.change(sortSelect, { target: { value: 'amount-desc' } });

    expect(handleSort).toHaveBeenCalledTimes(1);
    expect(handleSort).toHaveBeenCalledWith('amount-desc');
  });
});
