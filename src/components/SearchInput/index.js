// @flow
import React, { Component } from 'react';
import injectSheet from 'react-jss';
import debounce from 'lodash/debounce';


type Props = {|
  classes: { [string]: string },
  defaultQuery?: string,
  onQueryChange: (query: string) => mixed,
|};

type State = {
  query: string,
};

class SearchInput extends Component<Props, State> {
  constructor(props: Props) {
    super();

    this.state = {
      query: props.defaultQuery || '',
    };
  }

  debouncedHandleQueryChanged = debounce((query: string) => {
    const { onQueryChange } = this.props;

    onQueryChange(query);
  }, 500);

  handleChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    const query = event.currentTarget.value;

    this.setState({ query });

    this.debouncedHandleQueryChanged(query)
  };

  render() {
    const { classes } = this.props;
    const { query } = this.state;

    return (
      <input
        className={classes.searchInput}
        type="text"
        placeholder="Search"
        value={query}
        onChange={this.handleChange}
      />
    );
  }
}

const styles = {
  searchInput: {
    boxSizing: 'border-box',
    width: '100%',
    height: '32px',
    maxWidth: '400px',
    border: '1px solid lightgray',
    borderRadius: '4px',
    paddingLeft: '8px',
    paddingRight: '8px',
    fontSize: '16px',
    fontFamily: 'sans-serif',

    '&::placeholder': {
      color: 'lightgray',
    },
  }
};


export default injectSheet(styles)(SearchInput);
