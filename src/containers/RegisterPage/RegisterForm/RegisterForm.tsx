import React from 'react';
import { observer } from 'mobx-react';

import * as Styled from './style';

import { useForm } from 'react-hook-form';

const RegisterForm: React.FC = () => {
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Styled.Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input name="firstname" ref={register} /> {/* register an input */}
        <input name="lastname" ref={register({ required: true })} />
        {errors.lastname && 'Last name is required.'}
        <input name="age" ref={register({ pattern: /\d+/ })} />
        {errors.age && 'Please enter number for age.'}
        <input type="submit" />
      </form>
    </Styled.Wrapper>
  );
};

export default observer(RegisterForm);
