// @flow
import React from 'react';
import injectSheet from 'react-jss';
import { NavLink } from 'react-router-dom';
import parseLocationSearch from '../../parseLocationSearch';
import { SMALL_DEVICE } from '../../MediaQueries';


type Props = {
  classes: { [string]: string },
};

function isFilterLinkActive(filterValue) {
  return (_, location) => {
    return location.pathname === '/' && parseLocationSearch(location.search).filter === filterValue
  };
}

const NavigationMenu = ({ classes }: Props) => (
  <ul className={classes.navigationMenu}>
    <li>
      <NavLink
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
        to="/"
        isActive={isFilterLinkActive(undefined)}
        exact
      >
        Browse
      </NavLink>
    </li>
    <li>
      <NavLink
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
        to="/?filter=checked-out"
        isActive={isFilterLinkActive('checked-out')}
      >
        Checked Out
      </NavLink>
    </li>
    <li>
      <NavLink
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
        to="/?filter=reserved"
        isActive={isFilterLinkActive('reserved')}
      >
        Reserved
      </NavLink>
    </li>
    <hr className={classes.separator}/>
    <li>
      <NavLink
        className={classes.menuItem}
        activeClassName={classes.activeMenuItem}
        to="/my-books"
      >
        My Books
      </NavLink>
    </li>
  </ul>
);

const styles = {
  navigationMenu: {
    margin: 0,
    padding: '16px',
    listStyle: 'none',
    backgroundColor: 'white',

    [SMALL_DEVICE]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  menuItem: {
    display: 'inline-block',
    margin: '4px 0',
    textDecoration: 'none',
    fontFamily: 'sans-serif',
    color: 'deepskyblue',

    [SMALL_DEVICE]: {
      fontSize: '13px',
    },
  },
  activeMenuItem: {
    color: 'gray',
  },
  separator: {
    margin: '4px 0',

    [SMALL_DEVICE]: {
      margin: '4px 4px',
    },
  },
};


export default injectSheet(styles)(NavigationMenu);
