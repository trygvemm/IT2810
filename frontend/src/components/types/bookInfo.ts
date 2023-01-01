import Comment from "./Comment";

export interface bookInfo {
  comments: [Comment];
  id: string;
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

export interface bookSiteInfo {
  bookId: bookInfo[];
}
