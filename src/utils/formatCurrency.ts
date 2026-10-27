/**
 * Formats a numeric value into a standard currency string (USD).
 *
 * Rules:
 * - Always displayed with two decimal places and a currency symbol ($).
 * - Thousands are separated by commas (e.g. 1234.5 -> "$1,234.50").
 * - Zero formats to "$0.00".
 * - Negative numbers format with a leading minus sign before the symbol (e.g. -5 -> "-$5.00").
 * - If NaN or invalid, falls back safely to "$0.00".
 *
 * @param amount - The numeric amount to format
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number): string {
  if (typeof amount !== 'number' || Number.isNaN(amount)) {
    return '$0.00';
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
