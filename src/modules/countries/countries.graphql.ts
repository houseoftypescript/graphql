import { gql } from 'apollo-server-core';

const typeDefs = gql`
  extend type Query {
    countries: [Country]
    country(code: String!): Country
  }

  type Country {
    name: Name
    tld: [String]
    cca2: String
    ccn3: String
    cca3: String
    cioc: String
    independent: Boolean
    status: String
    unMember: Boolean
    idd: Idd
    capital: [String]
    altSpellings: [String]
    region: String
    subregion: String
    latlng: [Float]
    landlocked: Boolean
    area: Float
    flag: String
    maps: Maps
    population: Int
    fifa: String
    car: Car
    timezones: [String]
    continents: [String]
    flags: Flags
    coatOfArms: CoatOfArms
    startOfWeek: String
    capitalInfo: CapitalInfo
    postalCode: PostalCode
    borders: [String]
  }

  type Name {
    common: String
    official: String
  }

  type Idd {
    root: String
    suffixes: [String]
  }

  type Maps {
    googleMaps: String
    openStreetMaps: String
  }

  type Car {
    signs: [String]
    side: String
  }

  type Flags {
    png: String
    svg: String
    alt: String
  }

  type CoatOfArms {
    png: String
    svg: String
  }

  type CapitalInfo {
    latlng: [Float]
  }

  type PostalCode {
    format: String
    regex: String
  }
`;

export default typeDefs;
