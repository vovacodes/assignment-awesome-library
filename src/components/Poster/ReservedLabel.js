// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {|
  classes: { [classNames: string]: string },
|};

const ReservedLabel = ({ classes }: Props) => <div className={classes.reservedLabel}>Reserved</div>;

const styles = {
  reservedLabel: {
    marginTop: '8px',
    fontFamily: 'sans-serif',
    fontSize: '12px',
    color: 'gray',

    [SMALL_DEVICE]: {
      fontSize: '11px',
    },
  },
};


export default injectSheet(styles)(ReservedLabel);
