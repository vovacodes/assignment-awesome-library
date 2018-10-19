// @flow
import React from 'react';
import BookActionOverlay from './BookActionOverlay';


type Props = {
  onCheckOutClick: () => mixed,
};

const CheckOutOverlay = ({ onCheckOutClick }: Props) => (
  <BookActionOverlay
    message="This book is available"
    actionButtonTitle="Check out"
    onActionButtonClick={onCheckOutClick}
  />
);


export default CheckOutOverlay;
