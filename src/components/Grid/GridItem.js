// @flow
import React from 'react';
import type { Node } from 'react';
import injectSheet from 'react-jss';


type Props = {
  classes: { [string]: string },
  children: Node,
};

const GridItem = ({ classes, children }: Props) => (
  <div className={classes.gridItem}>{children}</div>
);

const styles = {
  gridItem: {
    marginRight: '16px',
    marginBottom: '16px',
  },
};


export default injectSheet(styles)(GridItem);
