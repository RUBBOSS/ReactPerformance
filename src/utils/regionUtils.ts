import { Country } from '../types/Country';

export function getUniqueRegions(countries: Country[]): string[] {
  const uniqueRegions = [
    ...new Set(countries.map((country) => country.region)),
  ];
  return uniqueRegions.filter(Boolean).sort();
}
