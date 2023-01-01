export default interface Book {
  id: string;
  author: string;
  title: string;
  year: number;
  language: string;
  comments: [Comment];
}
