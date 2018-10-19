// @flow
import type { Cancellable } from '../../makeCancellable';
import makeCancellable from '../../makeCancellable';


export type Book = {|
  author: string,
  country: string,
  imageLink: string,
  language: string,
  link: string,
  pages: number,
  title: string,
  year: number,
|};

type Options = {|
  query?: ?string,
|};

function getBooks(options: ?Options): Cancellable<$ReadOnlyArray<Book>> {
  const query = options && options.query;

  let booksPromise = fetch('https://raw.githubusercontent.com/benoitvallon/100-best-books/master/books.json')
    .then((response) => response.json());

  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    // filter books with the `query`
    // we do it here for sake of simplicity
    // in real life we would send query as a parameter to the API call
    booksPromise = booksPromise.then(
      (books) => books.filter((book: Book) => {
        if (book.author.toLowerCase().includes(lowerCaseQuery)) return true;

        if (book.title.toLowerCase().includes(lowerCaseQuery)) return true;

        return false;
      })
    );
  }

  return makeCancellable(booksPromise);
}


export default getBooks;
