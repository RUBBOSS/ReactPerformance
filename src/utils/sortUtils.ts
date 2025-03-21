import { Country } from '../types/Country';
import { SortDirection, SortField } from '../components/SortOptions';

export function sortCountries(
  countries: Country[],
  field: SortField,
  direction: SortDirection
): Country[] {
  return [...countries].sort((a, b) => {
    let comparison = 0;

    if (field === 'name') {
      comparison = a.name.common.localeCompare(b.name.common);
    } else if (field === 'population') {
      comparison = a.population - b.population;
    }

    return direction === 'asc' ? comparison : -comparison;
  });
}
