import React from 'react';

const DbContext = React.createContext(null);

export const withDb = Component => props => (
  <DbContext.Consumer>
    {db => 
      <Component {...props} db={db} />
      }
  </DbContext.Consumer>
);

export default DbContext;