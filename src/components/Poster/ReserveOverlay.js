// @flow
import React from 'react';
import BookActionOverlay from './BookActionOverlay';


type Props = {
  onReserveClick: () => mixed,
};

const ReserveOverlay = ({ onReserveClick }: Props) => (
  <BookActionOverlay
    message="This book is currently checked out, but you can get it as soon as it is back in stock"
    actionButtonTitle="Reserve"
    actionButtonColor="deepskyblue"
    onActionButtonClick={onReserveClick}
  />
);


export default ReserveOverlay;
