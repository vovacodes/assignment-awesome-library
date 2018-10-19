// @flow
import React from 'react';
import type { Node } from 'react';
import getBooks from './getBooks';
import type { Book } from './getBooks';
import type { Cancellable } from '../../makeCancellable';
import { BooksAvailabilityConsumer } from '../BooksAvailabilityProvider';
import type { BooksAvailability } from '../BooksAvailabilityProvider/BooksAvailabilityService';


type ResultLoading = {|
  loading: true,
|};

type ResultFailure = {|
  failure: true,
  error: string,
|};

type ResultSuccess = {|
  success: true,
  books: $ReadOnlyArray<Book>,
  booksAvailability: BooksAvailability,
  reserveBook: (bookId: string) => Promise<mixed>,
  cancelBookReservation: (bookId: string) => Promise<mixed>,
  checkOutBook: (bookId: string) => Promise<mixed>,
  returnBook: (bookId: string) => Promise<mixed>,
|};

type Props = {|
  query?: string,
  children: (ResultLoading | ResultFailure | ResultSuccess) => Node,
|};

type State = {|
  loading: boolean,
  error: ?string,
  books: ?$ReadOnlyArray<Book>
|};

class BooksData extends React.Component<Props, State> {
  booksCancellable: ?Cancellable<$ReadOnlyArray<Book>>;

  constructor() {
    super();

    this.state = {
      loading: true,
      error: null,
      books: null,
    };
  }

  async componentDidMount() {
    const { query } = this.props;

    this.fetchBooks(query);
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.query === this.props.query) return;

    this.cancelInFlightRequest();

    this.fetchBooks(this.props.query);
  }

  componentWillUnmount() {
    this.cancelInFlightRequest();
  }

  cancelInFlightRequest() {
    if (this.booksCancellable) this.booksCancellable.cancel();
  }

  async fetchBooks(query: ?string) {
    this.setState({
      loading: true,
      error: null,
      books: null,
    });

    try {
      this.booksCancellable = getBooks({ query });

      const books = await this.booksCancellable.promise;

      this.setState({
        loading: false,
        error: null,
        books,
      });
    } catch (error) {
      if (error.isCancelled) return;

      this.setState({
        loading: false,
        error: error.message,
        books: null,
      });
    }
  }

  render() {
    const { children } = this.props;
    const { loading, error, books } = this.state;

    return (
      <BooksAvailabilityConsumer>
        {(booksAvailabilityData) => {
          if (loading || booksAvailabilityData.loading) return children({ loading: true });

          if (error) return children({ failure: true, error });
          if (booksAvailabilityData.error) return children({ failure: true, error: booksAvailabilityData.error });

          if (!books) return children({ failure: true, error: 'BooksData: Unexpected books result' });
          if (!booksAvailabilityData.booksAvailability) return children({ failure: true, error: 'BooksData: Unexpected books availability result' });

          return children({
            success: true,
            books,
            booksAvailability: booksAvailabilityData.booksAvailability,
            reserveBook: booksAvailabilityData.reserveBook,
            cancelBookReservation: booksAvailabilityData.cancelBookReservation,
            checkOutBook: booksAvailabilityData.checkOutBook,
            returnBook: booksAvailabilityData.returnBook,
          });
        }}
      </BooksAvailabilityConsumer>
    );

  }
}


export default BooksData;
