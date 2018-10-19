// @flow
import React from 'react';
import injectSheet from 'react-jss';
import BooksData from '../../dataComponents/BooksData';
import LoadingIndicator from '../../components/LoadingIndicator';
import type { Book } from '../../dataComponents/BooksData/getBooks';
import getBookId from '../../getBookId';
import NoResultsView from '../../components/NoResultsView';
import { Grid, GridItem } from '../../components/Grid';
import ReturnOverlay from '../../components/Poster/ReturnOverlay';
import CancelReservationOverlay from '../../components/Poster/CancelReservationOverlay';
import Poster from '../../components/Poster';
import DueDateLabel from '../../components/Poster/DueDateLabel';
import ReservedLabel from '../../components/Poster/ReservedLabel';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [string]: string },
};

class MyBooksPage extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.myBooksPageContainer}>
        <BooksData>
          {(booksResult) => {
            if (booksResult.loading) return <LoadingIndicator />;

            if (booksResult.failure) return <div>Error: {booksResult.error}</div>;

            const { booksAvailability, returnBook, cancelBookReservation } = booksResult;
            const books = booksResult.books.filter((book: Book) => {
              const bookId = getBookId(book);
              const availability = booksAvailability[bookId];

              return availability && (availability.reservedByMe || availability.checkedOutByMe);
            });

            if (books.length === 0) return <NoResultsView />;

            return (
              <Grid>
                {books.map((book) => {
                  const bookId = getBookId(book);
                  const bookAvailability = booksAvailability[bookId];
                  const reservedByMe = bookAvailability && bookAvailability.reservedByMe;
                  const checkedOutByMe = bookAvailability && bookAvailability.checkedOutByMe;

                  let overlay;
                  let additionalInfo;
                  if (checkedOutByMe) {
                    const checkOutDueDate = bookAvailability.checkOutDueDate;

                    if (!checkOutDueDate) throw new Error(`MyBooksPage: checkOutDueDate for the book with id=${bookId} is not defined`);

                    overlay = <ReturnOverlay onReturnClick={() => returnBook(bookId)} />;
                    additionalInfo = <DueDateLabel date={checkOutDueDate} />;
                  } else if (reservedByMe) {
                    overlay = <CancelReservationOverlay onCancelReservationClick={() => cancelBookReservation(bookId)} />;
                    additionalInfo = <ReservedLabel />;
                  }

                  return (
                    <GridItem key={bookId}>
                      <Poster
                        imageUrl={`https://raw.githubusercontent.com/benoitvallon/100-best-books/master/static/${book.imageLink}`}
                        title={book.title}
                        subtitle={book.author}
                        additionalInfo={additionalInfo}
                        overlay={overlay}
                      />
                    </GridItem>
                  )
                })}
              </Grid>
            )
          }}
        </BooksData>
      </div>
    )
  }
}

const styles = {
  myBooksPageContainer: {
    marginTop: '64px',

    [SMALL_DEVICE]: {
      marginTop: '24px',
    },
  },
};


export default injectSheet(styles)(MyBooksPage);
