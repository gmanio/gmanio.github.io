import React from 'react';
import Background from '../../containers/MainPage/Background';
import { observer } from 'mobx-react';

import * as Styled from './style';
import { useStores } from '../../stores';

const MainPage: React.FC = () => {
  const { userStore } = useStores();

  React.useEffect(() => {
    setTimeout(() => {
      userStore.setName('www');
    }, 3000);

    setTimeout(() => {
      userStore.setName('jpark');
    }, 6000);
  }, []);

  return (
    <Styled.Wrapper>
      {userStore.name}
      <Background />
    </Styled.Wrapper>
  );
};

export default observer(MainPage);
