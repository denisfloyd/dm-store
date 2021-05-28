import React, { useState } from 'react';
import { ContainerLogo, LogoTitle } from '../../components/Header/styles';
import { FormLogin, Input, SignInButton, SignInButtonActive, UserIcon } from './styles';
import { MdPerson } from "react-icons/md";
import { useAuth } from '../../hooks/useAuth';
import { Container } from './styles';
import logo from "../../assets/images/logo-dm.png";

interface DisplayButtonProps {
  username: string,
  password: string,
}

const DisplayButton: React.FC<DisplayButtonProps> = ({ username, password }): JSX.Element => {
  const { authenticate } = useAuth();

  const handleAuthenticate = () => {
    authenticate(username, password);
  }

  return username.length > 0 && password.length > 0 ? <SignInButtonActive onClick={ () => handleAuthenticate() } type="button">LOGIN</SignInButtonActive> : <SignInButton type="button">LOGIN</SignInButton>;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container>
      <ContainerLogo to="/">
        <img src={logo} alt="DM-Store" />
        <LogoTitle>DM-STORE</LogoTitle>
      </ContainerLogo>
      <FormLogin>
        <UserIcon>
          <MdPerson size={36} color="#434458" />
        </UserIcon>
        <div className="input-container">
          <Input type="text" name="username" required value={username} onChange={ (event) => setUsername(event.target.value) } />
          <label>Nome de usuário</label>
        </div>
        <div className="input-container">
          <Input type="password" name="password" required value={password} onChange={ (event) => setPassword(event.target.value)}/>
          <label>Senha</label>
        </div>
        <DisplayButton username={username} password={password} />
      </FormLogin>
    </Container>
  );
};

export default Login;
