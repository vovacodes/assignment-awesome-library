// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [classNames: string]: string },
};

const ReservationNotAvailableOverlay = ({ classes }: Props) => (
  <div className={classes.bookActionOverlay}>
    <div className={classes.message}>
      We are sorry, but this book is currently not available for reservation
    </div>
  </div>
);

const styles = {
  bookActionOverlay: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: '16px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },

  message: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',

    [SMALL_DEVICE]: {
      fontSize: '13px',
      lineHeight: '20px',
    },
  },
};


export default injectSheet(styles)(ReservationNotAvailableOverlay);

