// @flow
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import injectSheet from 'react-jss';
import BrowsePage from './pages/BrowsePage';
import MyBooksPage from './pages/MyBooksPage';
import Logo from './components/Logo';
import NavigationMenu from './components/NavigationMenu';
import NotFoundPage from './pages/NotFoundPage';
import BooksAvailabilityProvider from './dataComponents/BooksAvailabilityProvider';
import { SMALL_DEVICE } from './MediaQueries';


type Props = {
  classes: { [string]: string }
};

class App extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <BooksAvailabilityProvider>
        <BrowserRouter>
          <div className={classes.app}>
            <header className={classes.header}>
              <Logo />
            </header>
            <nav className={classes.navigation}>
              <NavigationMenu />
            </nav>
            <main className={classes.main}>
              <Switch>
                <Route exact path="/" component={BrowsePage} />
                <Route path="/my-books" component={MyBooksPage} />
                <Route component={NotFoundPage} />
              </Switch>
            </main>
          </div>
        </BrowserRouter>
      </BooksAvailabilityProvider>
    );
  }
}

const styles = {
  '@global': {
    body: {
      margin: 0,
      backgroundColor: '#eeeeee',
    },
  },
  app: {
    display: 'grid',
    gridTemplateColumns: '240px auto',
  },
  header: {
    gridColumnStart: 1,
    padding: '16px 16px',
  },
  navigation: {
    gridColumnStart: 1,

    [SMALL_DEVICE]: {
      gridColumnEnd: 3,
    },
  },
  main: {
    gridColumnStart: 2,
    gridRowStart: 1,
    gridRowEnd: 4,
    paddingLeft: '16px',
    paddingRight: '16px',

    [SMALL_DEVICE]: {
      gridColumnStart: 1,
      gridColumnEnd: 3,
      gridRowStart: 'auto',
    }
  },
};


export default injectSheet(styles)(App);
