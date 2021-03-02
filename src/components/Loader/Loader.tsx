import React from 'react';
import * as Styled from './style';

const Loader: React.FC = () => {
  return (
    <Styled.Wrapper>
      <Styled.HexagonWrapper>
        <Styled.Hexagon />
      </Styled.HexagonWrapper>
      <Styled.CenterText>WWW</Styled.CenterText>
    </Styled.Wrapper>
  );
};

export default Loader;
