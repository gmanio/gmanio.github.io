import React from 'react';
import { observer } from 'mobx-react';

import * as Styled from './style';

import RegisterForm from '../../containers/RegisterPage/RegisterForm';

const RegisterPage: React.FC = () => {
  return (
    <Styled.Wrapper>
      <RegisterForm/>
    </Styled.Wrapper>
  );
};

export default observer(RegisterPage);
