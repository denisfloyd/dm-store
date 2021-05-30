import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { CircularProgress } from '@material-ui/core';
import { ContainerLogo, LogoTitle } from '../../components/Header/styles';
import { FormLogin, Input, SignInButton, UserIcon } from './styles';
import { useAuth } from '../../hooks/useAuth';
import { Container } from './styles';
import logo from '../../assets/images/logo-dm.png';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { authenticate } = useAuth();

  const handleAuthenticate = async (): Promise<void> => {
    await authenticate(username, password);
    setLoading(false);
  };

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
          <Input
            type="text"
            name="username"
            id="username"
            required
            value={username}
            onChange={event => setUsername(event.target.value)}
          />
          <label htmlFor="username">Nome de usuário</label>
        </div>
        <div className="input-container">
          <Input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
          <label htmlFor="password">Senha</label>
        </div>
        <SignInButton
          type="button"
          disabled={
            username.trim().length === 0 || password.trim().length === 0
          }
          onClick={() => {
            setLoading(true);
            handleAuthenticate();
          }}
        >
          <span>LOGIN</span>
          {
            loading && (
            <div className="loading-container">
              <CircularProgress color="inherit" size={20} />
            </div>
          )}
        </SignInButton>
      </FormLogin>
    </Container>
  );
};

export default Login;
