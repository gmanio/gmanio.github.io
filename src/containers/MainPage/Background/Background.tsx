import React from 'react';
import * as Styled from './style';

import Card from '../../../components/MainPage/Card';

const Background: React.FC = () => {
  // const handleAddHomeIconButton = () => {
  //   navigator.share({
  //     title: document.title,
  //     text: 'Hello World',
  //     url: 'https://developer.mozilla.org',
  //   });
  // };

  return (
    <Styled.Wrapper>
      {/* <Styled.Logo/> */}
      <Card/>
    </Styled.Wrapper>
  );
};

export default Background;
