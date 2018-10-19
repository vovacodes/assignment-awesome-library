// @flow
import React from 'react';
import injectSheet from 'react-jss';
import Button from '../Button';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [classNames: string]: string },
  message: string,
  actionButtonTitle: string,
  actionButtonColor?: string,
  onActionButtonClick: () => mixed,
};

const BookActionOverlay = ({ classes, message, actionButtonTitle, actionButtonColor, onActionButtonClick }: Props) => (
  <div className={classes.bookActionOverlay}>
    <div className={classes.textAndButtonWrapper}>
      <div className={classes.message}>{message}</div>
      <Button onClick={onActionButtonClick} backgroundColor={actionButtonColor}>
        {actionButtonTitle}
      </Button>}
    </div>
  </div>
);

const styles = {
  bookActionOverlay: {
    boxSizing: 'border-box',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    padding: '16px 8px',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',

    [SMALL_DEVICE]: {
      padding: '8px 8px',
    },
  },

  textAndButtonWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  message: {
    color: 'white',
    fontFamily: 'sans-serif',
    marginBottom: '24px',
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',

    [SMALL_DEVICE]: {
      fontSize: '13px',
      lineHeight: '20px',
      marginBottom: '16px',
    },
  },
};


export default injectSheet(styles)(BookActionOverlay);
