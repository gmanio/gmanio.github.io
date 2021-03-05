import React from 'react';
import * as Styled from './style';

const Header: React.FC = () => {
  return (
    <Styled.HeaderWrapper position={'relative'}>
      <Styled.HeaderToolbar>
        <Styled.HeaderIconButton edge="start" color="inherit" aria-label="menu">
          <Styled.MenuIcon />
        </Styled.HeaderIconButton>
        <Styled.HeaderTitle variant="h6">Header</Styled.HeaderTitle>
        <Styled.HeaderAvatar alt="profile" src={''} />
      </Styled.HeaderToolbar>
    </Styled.HeaderWrapper>
  );
};

export default Header;
