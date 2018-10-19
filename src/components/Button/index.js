// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {|
  classes: { [classNames: string]: string },
  backgroundColor?: string,
  children: Node,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => mixed,
|};

const Button = ({ classes, children, onClick }: Props) => (
  <button className={classes.button} onClick={onClick}>{children}</button>
);

const styles = {
  button: {
    height: '32px',
    border: 'none',
    borderRadius: '4px',
    padding: '0 16px',
    backgroundColor: ({ backgroundColor }) => backgroundColor || 'limegreen',
    fontSize: '13px',
    fontFamily: 'sans-serif',
    color: 'white',

    [SMALL_DEVICE]: {
      padding: '0 8px',
      fontSize: '12px',
    },
  },
};


export default injectSheet(styles)(Button);
