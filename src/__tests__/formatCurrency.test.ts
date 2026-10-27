import { describe, it, expect } from 'vitest';
import { formatCurrency } from '../utils/formatCurrency';

describe('formatCurrency', () => {
  it('formats whole numbers with two decimal places', () => {
    expect(formatCurrency(10)).toBe('$10.00');
  });

  it('formats decimals with commas for thousands', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });

  it('formats negative numbers with a leading minus sign', () => {
    expect(formatCurrency(-5)).toBe('-$5.00');
  });

  it('formats large numbers with proper comma grouping', () => {
    expect(formatCurrency(1000000)).toBe('$1,000,000.00');
    expect(formatCurrency(9876543.21)).toBe('$9,876,543.21');
  });

  it('rounds numbers to two decimal places', () => {
    expect(formatCurrency(12.345)).toBe('$12.35');
    expect(formatCurrency(12.344)).toBe('$12.34');
  });

  it('safely handles NaN and non-numbers', () => {
    expect(formatCurrency(NaN)).toBe('$0.00');
    // @ts-expect-error Testing runtime invalid input defense
    expect(formatCurrency(null)).toBe('$0.00');
  });
});
