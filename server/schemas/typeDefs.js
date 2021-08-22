const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String
    image: String
    link: String
  }

  type Auth {
      token: String!
      user: User
  }

  type Query {
    me(userId: ID!): User
  }

  type Mutation {
    LOGIN_USER(email: String!): Auth
    ADD_USER(username: String!, email: String!): Auth
    SAVE_BOOK(userId: ID!, book: String!): User
    REMOVE_BOOK(userId: ID!, book: String!): User
  }
`;

module.exports = typeDefs;
