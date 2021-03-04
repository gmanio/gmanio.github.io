import React from 'react';
import Background from '../../containers/MainPage/Background';
import * as Styled from './style';
// import Loader from './../../components/Loader';

const MainPage: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Background/>
    </Styled.Wrapper>
  );
};

export default MainPage;
