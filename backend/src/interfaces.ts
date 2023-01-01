export interface BookFilters {
  id: string | undefined;
  title: string | undefined;
  author: string | undefined;
  language: string | undefined;
  minYear: number | undefined;
  maxYear: number | undefined;
}

export enum SortOrder {
  asc = "asc",
  desc = "desc",
}

export interface booksOrderByInput {
  author?: SortOrder;
  title?: SortOrder;
  year?: SortOrder;
  language?: SortOrder;
}

export interface BookArgs {
  filters: BookFilters;
  limit: number;
  offset: number;
  orderBy: booksOrderByInput;
}

export interface CommentInput {
  text: string;
  bookId: string;
}

export interface CreateCommentArgs {
  input: CommentInput;
}
