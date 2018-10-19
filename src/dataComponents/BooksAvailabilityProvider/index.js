// @flow
import React from 'react';
import type { Node } from 'react';
import type { BooksAvailability } from './BooksAvailabilityService';
import * as BooksAvailabilityService from './BooksAvailabilityService';
import type { Cancellable } from '../../makeCancellable';


const { Provider, Consumer } = React.createContext({
  loading: false,
  error: 'BooksAvailabilityProvider is missing',
  booksAvailability: null,
});

type Props = {|
  children: Node,
|};

type State = {|
  loading: boolean,
  error: ?string,
  booksAvailability: ?BooksAvailability,
  reserveBook: (bookId: string) => Promise<mixed>,
  cancelBookReservation: (bookId: string) => Promise<mixed>,
  checkOutBook: (bookId: string) => Promise<mixed>,
  returnBook: (bookId: string) => Promise<mixed>,
|};

class BooksAvailabilityProvider extends React.Component<Props, State> {
  booksAvailabilityCancellable: Cancellable<BooksAvailability>;

  reserveBook = async (bookId: string) => {
    const updatedBooksAvailability = await BooksAvailabilityService.reserveBook(bookId);

    this.setState({
      booksAvailability: updatedBooksAvailability,
    });
  };

  cancelBookReservation = async (bookId: string) => {
    const updatedBooksAvailability = await BooksAvailabilityService.cancelBookReservation(bookId);

    this.setState({
      booksAvailability: updatedBooksAvailability,
    });
  };

  checkOutBook = async (bookId: string) => {
    const updatedBooksAvailability = await BooksAvailabilityService.checkOutBook(bookId);

    this.setState({
      booksAvailability: updatedBooksAvailability,
    });
  };

  returnBook = async (bookId: string) => {
    const updatedBooksAvailability = await BooksAvailabilityService.returnBook(bookId);

    this.setState({
      booksAvailability: updatedBooksAvailability,
    });
  };

  state = {
    loading: true,
    error: null,
    booksAvailability: null,
    reserveBook: this.reserveBook,
    cancelBookReservation: this.cancelBookReservation,
    checkOutBook: this.checkOutBook,
    returnBook: this.returnBook,
  };

  async componentDidMount() {
    this.booksAvailabilityCancellable = BooksAvailabilityService.getBooksAvailability();

    try {
      const booksAvailability = await this.booksAvailabilityCancellable.promise;

      this.setState({
        loading: false,
        error: null,
        booksAvailability,
      });
    } catch (error) {
      if (error.isCancelled) return;

      this.setState({
        loading: false,
        error: error.message,
        booksAvailability: null,
      });
    }
  }

  componentWillUnmount() {
    if (this.booksAvailabilityCancellable) this.booksAvailabilityCancellable.cancel();
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>;
  }
}


export default BooksAvailabilityProvider;
export { Consumer as BooksAvailabilityConsumer };
