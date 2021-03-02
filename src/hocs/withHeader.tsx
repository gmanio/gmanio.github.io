import React from 'react';
import Header from '../containers/Header';

const withHeaders = <T extends Record<string, unknown>>(WrappedComponent: React.FC<T>) => {
  return (props: T): JSX.Element => {
    return (
      <Header>
        <WrappedComponent {...props} />
      </Header>
    );
  };
};

export default withHeaders;
