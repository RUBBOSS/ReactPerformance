import { useState, useEffect } from 'react';
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

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

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

  const regions = getUniqueRegions(countries);

  const filteredCountries = countries.filter((country) => {
    // Apply region filter if selected
    const matchesRegion = !selectedRegion || country.region === selectedRegion;

    // Apply search filter if query exists
    const matchesSearch =
      !searchQuery ||
      country.name.common.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesRegion && matchesSearch;
  });

  // Sort the filtered results
  const sortedCountries = sortCountries(
    filteredCountries,
    sortField,
    sortDirection
  );

  const handleRegionChange = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow py-6 px-4">
        <h1 className="text-2xl font-bold">Countries of the World</h1>
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
        />
      </main>
    </div>
  );
}

export default App;
