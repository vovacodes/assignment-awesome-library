// @flow
import React from 'react';


const NoResultsView = () => (
  <div
    style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '48px 0',
      textAlign: 'center',
    }}
  >
    We are sorry, there are no books matching your query.
  </div>
);


export default NoResultsView;
