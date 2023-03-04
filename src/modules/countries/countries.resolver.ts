import { getCountries, getCountry } from './countries.service';
import { Country } from './countries.types';

const resolvers = {
  Query: {
    countries: async (): Promise<Country[]> => {
      return getCountries();
    },
    country: async (
      _: unknown,
      { code }: { code: string }
    ): Promise<Country> => {
      return getCountry(code);
    },
  },
};

export default resolvers;
