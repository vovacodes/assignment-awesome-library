// @flow
import React from 'react';
import BookActionOverlay from './BookActionOverlay';


type Props = {
  onCancelReservationClick: () => mixed,
};

const CancelReservationOverlay = ({ onCancelReservationClick }: Props) => (
  <BookActionOverlay
    message="You reserved this book"
    actionButtonTitle="Cancel reservation"
    actionButtonColor="red"
    onActionButtonClick={onCancelReservationClick}
  />
);


export default CancelReservationOverlay;
