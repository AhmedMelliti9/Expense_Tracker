import { CATEGORIES } from '../types/expense';

export type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

interface FilterBarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  sortOption: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

export function FilterBar({
  selectedCategory,
  onCategoryChange,
  sortOption,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Category Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 flex-1">
        <label
          htmlFor="category-filter"
          className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0"
        >
          Filter by Category:
        </label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full sm:w-auto min-w-[160px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
        >
          <option value="All">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Control */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 shrink-0">
        <label
          htmlFor="sort-control"
          className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0"
        >
          Sort by:
        </label>
        <select
          id="sort-control"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="w-full sm:w-auto min-w-[200px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
        >
          <option value="date-desc">Date (Newest first)</option>
          <option value="date-asc">Date (Oldest first)</option>
          <option value="amount-desc">Amount (Highest first)</option>
          <option value="amount-asc">Amount (Lowest first)</option>
        </select>
      </div>
    </div>
  );
}
