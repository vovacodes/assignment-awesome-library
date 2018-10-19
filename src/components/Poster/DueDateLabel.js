// @flow
import React from 'react';
import injectSheet from 'react-jss';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import isPast from 'date-fns/is_past';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [classNames: string]: string },
  date: number,
};

const DueDateLabel = ({ classes, date }: Props) => (
  <div className={classes.dueDateLabelContainer}>
    <div className={classes.label}>Due date:</div>
    <div className={classes.date} style={{ color: isPast(new Date(date)) ? 'red' : 'gray'}}>
      {distanceInWordsToNow(new Date(date), { addSuffix: true })}
    </div>
  </div>
);

const styles = {
  dueDateLabelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '8px',
  },
  label: {
    fontFamily: 'sans-serif',
    fontSize: '12px',
    color: 'gray',

    [SMALL_DEVICE]: {
      fontSize: '11px',
    },
  },
  date: {
    fontFamily: 'sans-serif',
    fontSize: '12px',

    [SMALL_DEVICE]: {
      fontSize: '11px',
    },
  },
};


export default injectSheet(styles)(DueDateLabel);
