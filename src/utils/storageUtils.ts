const VISITED_COUNTRIES_KEY = 'visitedCountries';

export const loadVisitedCountries = (): Set<string> => {
  try {
    const storedData = localStorage.getItem(VISITED_COUNTRIES_KEY);
    if (storedData) {
      return new Set(JSON.parse(storedData));
    }
  } catch (error) {
    console.error('Failed to load visited countries from localStorage:', error);
  }
  return new Set<string>();
};

export const saveVisitedCountries = (countries: Set<string>): void => {
  try {
    localStorage.setItem(
      VISITED_COUNTRIES_KEY,
      JSON.stringify(Array.from(countries))
    );
  } catch (error) {
    console.error('Failed to save visited countries to localStorage:', error);
  }
};
