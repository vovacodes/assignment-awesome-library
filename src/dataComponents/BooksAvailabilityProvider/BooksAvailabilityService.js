// @flow
import makeCancellable from '../../makeCancellable';
import type { Cancellable } from '../../makeCancellable';

const MILLIES_IN_DAY = 24 * 60 * 60 * 1000;

function delay(delayDurationMs: number) {
  return new Promise((resolve => {
    setTimeout(() => resolve(), delayDurationMs);
  }));
}

type BookAvailability = {
  checkOutDueDate: ?number,
  checkedOutByMe: boolean,
  reserved: boolean,
  reservedByMe: boolean,
};

export type BooksAvailability = { [bookId: string]: BookAvailability };

let booksAvailability: BooksAvailability = {
  'Chinua Achebe$Things Fall Apart': {
    checkOutDueDate: Date.now() + 2 * MILLIES_IN_DAY,
    checkedOutByMe: false,
    reserved: false,
    reservedByMe: false,
  },
  'Albert Camus$The Stranger': {
    checkOutDueDate: Date.now() + 7 * MILLIES_IN_DAY,
    checkedOutByMe: false,
    reserved: true,
    reservedByMe: false,
  },
  'Joseph Conrad$Nostromo': {
    checkOutDueDate: Date.now() + 10 * MILLIES_IN_DAY,
    checkedOutByMe: false,
    reserved: true,
    reservedByMe: true,
  },
  'Dante Alighieri$The Divine Comedy': {
    checkOutDueDate: Date.now() - 2 * MILLIES_IN_DAY,
    checkedOutByMe: true,
    reserved: false,
    reservedByMe: false,
  },
};

function getBooksAvailability(): Cancellable<BooksAvailability> {
  return makeCancellable(
    delay(1500).then(() => booksAvailability)
  );
}

function reserveBook(bookId: string): Promise<BooksAvailability> {
  return delay(200).then(() => {
      let bookAvailability = booksAvailability[bookId];

      if (!bookAvailability) {
        throw new Error(`The book with id=${bookId} is not checked out`);
      }

      bookAvailability = {
        ...bookAvailability,
        reserved: true,
        reservedByMe: true,
      };

      booksAvailability = {
        ...booksAvailability,
        [bookId]: bookAvailability
      };

      return booksAvailability;
  });
}

function cancelBookReservation(bookId: string): Promise<BooksAvailability> {
  return delay(200).then(() => {
      let bookAvailability = booksAvailability[bookId];

      if (!bookAvailability) {
        throw new Error(`The book with id=${bookId} is not reserved`);
      }

      bookAvailability = {
        ...bookAvailability,
        reserved: false,
        reservedByMe: false,
      };

      booksAvailability = {
        ...booksAvailability,
        [bookId]: bookAvailability
      };

      return booksAvailability;
  });
}

function checkOutBook(bookId: string): Promise<BooksAvailability> {
  return delay(200).then(() => {
    let bookAvailability = booksAvailability[bookId];

    if (bookAvailability && bookAvailability.checkOutDueDate) {
      throw new Error(`Can't check out the book with id=${bookId}. It is already checked out`);
    }

    bookAvailability = {
      checkOutDueDate: Date.now() + 14 * MILLIES_IN_DAY,
      checkedOutByMe: true,
      reserved: false,
      reservedByMe: false,
    };

    booksAvailability = {
      ...booksAvailability,
      [bookId]: bookAvailability
    };

    return booksAvailability;
  });
}

function returnBook(bookId: string): Promise<BooksAvailability> {
  return delay(200).then(() => {
    let bookAvailability = booksAvailability[bookId];

    if (!bookAvailability || !bookAvailability.checkOutDueDate) {
      throw new Error(`Can't return the book with id=${bookId}. It is not checked out`);
    }

    bookAvailability = {
      ...bookAvailability,
      checkOutDueDate: null,
      checkedOutByMe: false,
    };

    booksAvailability = {
      ...booksAvailability,
      [bookId]: bookAvailability
    };

    return booksAvailability;
  });
}


export {
  getBooksAvailability,
  reserveBook,
  cancelBookReservation,
  checkOutBook,
  returnBook,
};
