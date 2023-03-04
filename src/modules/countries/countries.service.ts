import { get } from '../../common/libs/axios';
import { API } from '../../common/environments';
import { Country } from './countries.types';

export const getCountries = async (): Promise<Country[]> => {
  const countries = await get<Country[]>(`${API}/countries`);
  return countries;
};

export const getCountry = async (code: string): Promise<Country> => {
  const countries = await get<Country[]>(`${API}/countries`);
  const country: Country | null =
    countries.find(
      (country) =>
        country.cca2.toLowerCase() === code.toLowerCase() ||
        country.cca3.toLowerCase() === code.toLowerCase()
    ) || ({} as Country);
  return country;
};
