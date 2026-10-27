export const CATEGORIES = [
  'Travel',
  'Food',
  'Equipment',
  'Software',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}
