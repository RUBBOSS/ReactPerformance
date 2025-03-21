import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import { fetchCountries } from './services/countryService';
import { Country } from './types/Country';
import CountryList from './components/CountryList';
import RegionFilter from './components/RegionFilter';
import SearchBar from './components/SearchBar';
import SortOptions, {
  SortDirection,
  SortField,
} from './components/SortOptions';
import { getUniqueRegions } from './utils/regionUtils';
import { sortCountries } from './utils/sortUtils';
import {
  loadVisitedCountries,
  saveVisitedCountries,
} from './utils/storageUtils';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    loadVisitedCountries()
  );

  useEffect(() => {
    const getCountries = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCountries();
        setCountries(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch country data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getCountries();
  }, []);

  // Save visited countries to localStorage whenever they change
  useEffect(() => {
    saveVisitedCountries(visitedCountries);
  }, [visitedCountries]);

  // Memoize regions to prevent recalculation on every render
  const regions = useMemo(() => getUniqueRegions(countries), [countries]);

  // Memoize filtered countries to prevent recalculation on every render
  const filteredCountries = useMemo(() => {
    return countries.filter((country) => {
      const matchesRegion =
        !selectedRegion || country.region === selectedRegion;

      const matchesSearch =
        !searchQuery ||
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesRegion && matchesSearch;
    });
  }, [countries, selectedRegion, searchQuery]);

  // Memoize sorted countries to prevent recalculation on every render
  const sortedCountries = useMemo(
    () => sortCountries(filteredCountries, sortField, sortDirection),
    [filteredCountries, sortField, sortDirection]
  );

  // Memoize event handlers to prevent recreation on every render
  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSortChange = useCallback(
    (field: SortField, direction: SortDirection) => {
      setSortField(field);
      setSortDirection(direction);
    },
    []
  );

  // Memoize the toggle function to prevent recreation on every render
  const toggleVisitedCountry = useCallback((countryCode: string) => {
    setVisitedCountries((prevVisited) => {
      const newVisited = new Set(prevVisited);
      if (newVisited.has(countryCode)) {
        newVisited.delete(countryCode);
      } else {
        newVisited.add(countryCode);
      }
      return newVisited;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow py-6 px-4">
        <h1 className="text-2xl font-bold">Countries of the World</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Visited: {visitedCountries.size} countries
        </p>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between gap-4 mb-2">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          <RegionFilter
            regions={regions}
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
          />
          <SortOptions
            sortField={sortField}
            sortDirection={sortDirection}
            onSortChange={handleSortChange}
          />
        </div>

        <CountryList
          countries={sortedCountries}
          isLoading={isLoading}
          error={error}
          visitedCountries={visitedCountries}
          onToggleVisited={toggleVisitedCountry}
        />
      </main>
    </div>
  );
}

export default App;
