import { memo } from 'react';
import { Country } from '../types/Country';
import CountryCard from './CountryCard';

interface CountryListProps {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
  visitedCountries: Set<string>;
  onToggleVisited: (countryCode: string) => void;
}

function CountryList({
  countries,
  isLoading,
  error,
  visitedCountries,
  onToggleVisited,
}: CountryListProps) {
  if (isLoading) {
    return <div className="text-center py-10">Loading countries...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">Error: {error}</div>;
  }

  if (countries.length === 0) {
    return <div className="text-center py-10">No countries found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {countries.map((country) => (
        <CountryCard
          key={country.cca3}
          country={country}
          isVisited={visitedCountries.has(country.cca3)}
          onToggleVisited={onToggleVisited}
        />
      ))}
    </div>
  );
}

export default memo(CountryList);
