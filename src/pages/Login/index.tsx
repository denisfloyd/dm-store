import React from 'react';
import { ContainerLogo, LogoTitle } from '../../components/Header/styles';
import { FormLogin, Input, SignInButton, SignInButtonActive, User } from './styles';
import { MdPerson } from "react-icons/md";
import { AuthProvider } from '../../hooks/useAuth';

import { Container } from './styles';
import logo from "../../assets/images/logo-dm.png";

const Login: React.FC = () => {
  return (
    <AuthProvider>
      <Container>
        <ContainerLogo to="/">
          <img src={logo} alt="DM-Store" />
          <LogoTitle>DM-STORE</LogoTitle>
        </ContainerLogo>
        <FormLogin>
          <User>
            <MdPerson size={ 36 } color="#434458" />
          </User>
          <div className="input-container">
            <Input type="text" name="username" required />
            <label>Usuário</label>
          </div>
          <div className="input-container">
            <Input type="password" name="password" required />
            <label>Senha</label>
          </div>
          <SignInButton>LOGIN</SignInButton>
          {/* <SignInButtonActive>LOGIN</SignInButtonActive> */}
        </FormLogin>
      </Container>
    </AuthProvider>
  );
};

export default Login;
