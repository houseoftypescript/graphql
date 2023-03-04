import { gql } from 'apollo-server-core';

const typeDefs = gql`
  extend type Query {
    trends: [Trend]
  }

  type Trend {
    country: String
    region: String
    subregion: String
    trends: [String]
  }
`;

export default typeDefs;
