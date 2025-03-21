import { memo } from 'react';
import { Country } from '../types/Country';

interface CountryCardProps {
  country: Country;
  isVisited: boolean;
  onToggleVisited: (countryCode: string) => void;
}

function CountryCard({
  country,
  isVisited,
  onToggleVisited,
}: CountryCardProps) {
  const handleToggleVisited = () => {
    onToggleVisited(country.cca3);
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden
      ${isVisited ? 'ring-2 ring-green-500 dark:ring-green-400' : ''}`}
    >
      <div className="relative">
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          className="w-full h-40 object-cover"
        />
        {isVisited && (
          <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 text-xs font-bold">
            VISITED
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">{country.name.common}</h2>
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <p>
            <span className="font-medium">Region:</span> {country.region}
          </p>
          <p>
            <span className="font-medium">Population:</span>{' '}
            {country.population.toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Capital:</span>{' '}
            {country.capital?.[0] || 'N/A'}
          </p>
        </div>
        <button
          onClick={handleToggleVisited}
          className={`mt-4 w-full px-4 py-2 rounded-md transition-colors
            ${
              isVisited
                ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900 dark:text-green-200'
                : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200'
            }`}
        >
          {isVisited ? 'Mark as Unvisited' : 'Mark as Visited'}
        </button>
      </div>
    </div>
  );
}

export default memo(CountryCard);
