export type SortField = 'name' | 'population';
export type SortDirection = 'asc' | 'desc';

interface SortOptionsProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

function SortOptions({
  sortField,
  sortDirection,
  onSortChange,
}: SortOptionsProps) {
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const [field, direction] = value.split('-') as [SortField, SortDirection];
    onSortChange(field, direction);
  };

  const currentValue = `${sortField}-${sortDirection}`;

  return (
    <div className="mb-6 w-full md:w-64">
      <select
        value={currentValue}
        onChange={handleSortChange}
        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Sort countries"
      >
        <option value="name-asc">Name (A-Z)</option>
        <option value="name-desc">Name (Z-A)</option>
        <option value="population-desc">Population (High-Low)</option>
        <option value="population-asc">Population (Low-High)</option>
      </select>
    </div>
  );
}

export default SortOptions;
