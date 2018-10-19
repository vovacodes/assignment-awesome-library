// @flow
import React from 'react';
import type { ChildrenArray, Element } from 'react';
import injectSheet from 'react-jss';
import GridItem from './GridItem';


type Props = {
  classes: { [string]: string },
  children: ChildrenArray<Element<typeof GridItem>>
};

const Grid = ({ classes, children }: Props) => <div className={classes.grid}>{children}</div>;

const styles = {
  grid: {
    display: 'flex',
    flexWrap: 'wrap',

    // compensate for the right and bottom margins
    // of the items in the last column and row
    marginRight: '-16px',
    marginBottom: '-16px',
  },
};

const StyledGrid = injectSheet(styles)(Grid);


export {
  StyledGrid as Grid,
  GridItem,
}
