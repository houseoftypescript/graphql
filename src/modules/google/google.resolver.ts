import { getTrends } from './google.service';

const resolvers = {
  Query: {
    trends: async (): Promise<
      { country: string; region: string; subregion: string; trends: string[] }[]
    > => {
      return getTrends();
    },
  },
};

export default resolvers;
