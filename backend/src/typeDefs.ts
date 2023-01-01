import { gql } from "apollo-server";

export const typeDefs = gql`
  type Book {
    id: String!
    author: String
    country: String
    imageLink: String
    language: String
    link: String
    pages: Int
    title: String
    year: Int
    comments: [Comment]
  }

  type Comment {
    id: String!
    text: String
    book: Book
  }

  input BookFilters {
    id: String
    title: String
    author: String
    language: String
    minYear: Int
    maxYear: Int
  }

  input booksOrderByInput {
    author: Sort
    title: Sort
    year: Sort
    language: Sort
  }

  enum Sort {
    asc
    desc
  }

  input CommentInput {
    text: String
    bookId: String
  }

  type Query {
    books(
      offset: Int
      limit: Int
      filters: BookFilters
      orderBy: booksOrderByInput
    ): [Book]
    book(title: String!): [Book]
    bookId(id: String!): [Book]
    commentsByBookId(bookId: String!): [Comment]
    booksWithDistinctLanguage: [Book]
  }

  type Mutation {
    createComment(input: CommentInput): Comment
  }
`;
