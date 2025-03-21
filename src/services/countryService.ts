import { Country } from '../types/Country';

const API_URL = 'https://restcountries.com/v3.1/all';

export async function fetchCountries(): Promise<Country[]> {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
}
