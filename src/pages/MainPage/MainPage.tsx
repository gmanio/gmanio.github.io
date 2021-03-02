import React from 'react';
import * as Styled from './style';
import Loader from './../../components/Loader';

const MainPage: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Loader />
    </Styled.Wrapper>
  );
};

export default MainPage;
