// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { Link } from 'react-router-dom';


type Props = {
  classes: { [string]: string },
};

const Logo = ({ classes }: Props) => (
  <Link className={classes.logo} to="/">The Library</Link>
);

const styles = {
  logo: {
    fontFamily: 'monospace',
    fontSize: '28px',
    textDecoration: 'none',
    color: 'gray',
  },
};


export default injectSheet(styles)(Logo);
