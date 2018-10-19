// @flow
import React from 'react';
import BookActionOverlay from './BookActionOverlay';


type Props = {
  onReturnClick: () => mixed,
};

const ReturnOverlay = ({ onReturnClick }: Props) => (
  <BookActionOverlay
    message="You checked out this book"
    actionButtonTitle="Return"
    actionButtonColor="lightcoral"
    onActionButtonClick={onReturnClick}
  />
);


export default ReturnOverlay;
