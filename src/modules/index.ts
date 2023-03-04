import { mergeResolvers } from '@graphql-tools/merge';
import { gql } from 'apollo-server-core';
import countriesTypeDefs from './countries/countries.graphql';
import countriesResolvers from './countries/countries.resolver';
import googleTypeDefs from './google/google.graphql';
import googleResolvers from './google/google.resolver';

const rootTypeDefs = gql`
  type Query {
    health: String
  }
`;

const rootResolvers = {
  Query: {
    health: () => 'healthy',
  },
};

export const typeDefs = [rootTypeDefs, countriesTypeDefs, googleTypeDefs];

export const resolvers = mergeResolvers([
  rootResolvers,
  countriesResolvers,
  googleResolvers,
]);
