import { memo } from 'react';

interface RegionFilterProps {
  regions: string[];
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

function RegionFilter({
  regions,
  selectedRegion,
  onRegionChange,
}: RegionFilterProps) {
  return (
    <div className="mb-6 w-full md:w-64">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="w-full p-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        aria-label="Filter countries by region"
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
}

export default memo(RegionFilter);
