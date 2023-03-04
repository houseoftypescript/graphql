import { API } from '../../common/environments';
import { get } from '../../common/libs/axios';
import { CountryRegions } from '../countries/countries.types';
import { TrendsByCountry } from './google.types';

export const getTrends = async (): Promise<
  { country: string; region: string; subregion: string; trends: string[] }[]
> => {
  const countriesRegions = await get<CountryRegions[]>(
    `${API}/countries/regions`
  );
  const googleTrends = await get<{
    trendsByNumber: Record<string, number>;
    trendsByCountries: TrendsByCountry[];
  }>(`${API}/google/trends`);
  const { trendsByCountries } = googleTrends;
  const trendsByCountriesAndRegions = trendsByCountries.map(
    ({ country, trends }) => {
      const countryRegion =
        countriesRegions.find(
          (c) =>
            c.name.toLowerCase() === country.toLowerCase() ||
            c.official.toLowerCase() === country.toLowerCase()
        ) || ({} as CountryRegions);
      return {
        country: countryRegion.name || country || '',
        trends,
        region: countryRegion.region || '',
        subregion: countryRegion.subregion || '',
      };
    }
  );
  return trendsByCountriesAndRegions;
};
