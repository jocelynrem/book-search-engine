const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  input Book {
    bookId: ObjectId!
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
    LOGIN_USER(email: String!, password: String!): Auth
    ADD_USER(username: String!, email: String!, password: String!): Auth
    SAVE_BOOK(input: Book): User
    REMOVE_BOOK(bookId: String!): User
  }
`;

module.exports = typeDefs;
