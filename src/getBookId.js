import type { Book } from './dataComponents/BooksData/getBooks';

export default function getBookId(book: Book) {
  return `${book.author}$${book.title}`;
}
