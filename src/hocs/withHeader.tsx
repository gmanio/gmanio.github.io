import React from 'react';
import Header from '../commons/Header';

const withHeader = <T extends Record<string, unknown>>(WrappedComponent: React.FC<T>) => {
  return (props: T): JSX.Element => {
    return (
      <>
        <Header />
        <WrappedComponent {...props} />
      </>
    );
  };
};

export default withHeader;
