// @flow
import React from 'react';
import injectSheet from 'react-jss';
import SearchInput from '../../components/SearchInput';
import parseLocationSearch from '../../parseLocationSearch';
import stringifyLocationSearch from '../../stringifyLocationSearch';
import BooksData from '../../dataComponents/BooksData';
import Poster from '../../components/Poster';
import { Grid } from '../../components/Grid';
import GridItem from '../../components/Grid/GridItem';
import CheckOutOverlay from '../../components/Poster/CheckOutOverlay';
import type { Book } from '../../dataComponents/BooksData/getBooks';
import type { BooksAvailability } from '../../dataComponents/BooksAvailabilityProvider/BooksAvailabilityService';
import LoadingIndicator from '../../components/LoadingIndicator';
import NoResultsView from '../../components/NoResultsView';
import ReserveOverlay from '../../components/Poster/ReserveOverlay';
import CancelReservationOverlay from '../../components/Poster/CancelReservationOverlay';
import ReturnOverlay from '../../components/Poster/ReturnOverlay';
import ReservationNotAvailableOverlay from '../../components/Poster/ReservationNotAvailableOverlay';
import getBookId from '../../getBookId';


function isBookCheckedOut(book: Book, booksAvailability: BooksAvailability) {
  const bookId = getBookId(book);

  if (!booksAvailability[bookId]) return false;

  return Boolean(booksAvailability[bookId].checkOutDueDate)
}

function isBookReserved(book: Book, booksAvailability: BooksAvailability) {
  const bookId = getBookId(book);

  if (!booksAvailability[bookId]) return false;

  return booksAvailability[bookId].reserved
}

type Props = {
  classes: { [string]: string },
  location: {
    search: string,
  },
  history: {
    push: (path: string) => mixed,
  },
};

const BrowsePage = ({ classes, history, location }: Props) => {
  const locationSearch = location.search;
  const queryParams = parseLocationSearch(locationSearch);
  const searchQuery = queryParams.q;
  const filterValue = queryParams.filter;

  return (
    <React.Fragment>
      <div className={classes.search}>
        <SearchInput
          key={filterValue}
          defaultQuery={searchQuery}
          onQueryChange={(query) => {
            const locationSearch = stringifyLocationSearch({
              ...queryParams,
              q: query,
            });

            history.push(`/${locationSearch}`);
          }}
        />
      </div>
      <BooksData query={searchQuery}>
        {(booksResult) => {
          if (booksResult.loading) return <LoadingIndicator />;

          if (booksResult.failure) return <div>Error: {booksResult.error}</div>;

          const {
            booksAvailability,
            reserveBook,
            cancelBookReservation,
            checkOutBook,
            returnBook,
          } = booksResult;
          let books = booksResult.books;

          if (filterValue === 'checked-out') {
            books = books.filter((book) => isBookCheckedOut(book, booksAvailability));
          } else if (filterValue === 'reserved') {
            books = books.filter((book) => isBookReserved(book, booksAvailability));
          }

          if (books.length === 0) return <NoResultsView />;

          return (
            <Grid>
              {books.map((book) => {
                const bookId = getBookId(book);
                const bookAvailability = booksAvailability[bookId];
                const reservedByMe = bookAvailability && bookAvailability.reservedByMe;
                const reserved = bookAvailability && bookAvailability.reserved;
                const checkedOutByMe = bookAvailability && bookAvailability.checkedOutByMe;
                const checkedOut = bookAvailability && Boolean(bookAvailability.checkOutDueDate);

                let overlay;
                if (checkedOutByMe) {
                  overlay = <ReturnOverlay onReturnClick={() => returnBook(bookId)} />
                } else if (reservedByMe) {
                  overlay = <CancelReservationOverlay onCancelReservationClick={() => cancelBookReservation(bookId)} />
                } else if (reserved) {
                  overlay = <ReservationNotAvailableOverlay />;
                } else if (checkedOut) {
                  overlay = <ReserveOverlay onReserveClick={() => reserveBook(bookId)}/>;
                } else {
                  overlay = <CheckOutOverlay onCheckOutClick={() => checkOutBook(bookId)}/>;
                }

                return (
                  <GridItem key={bookId}>
                    <Poster
                      imageUrl={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
                      title={book.title}
                      subtitle={book.author}
                      overlay={overlay}
                    />
                  </GridItem>
                )
              })}
            </Grid>
          );
        }}
      </BooksData>
    </React.Fragment>
  );
};

const styles = {
  search: {
    padding: '16px 0',
  },
};


export default injectSheet(styles)(BrowsePage);
