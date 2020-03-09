import React from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Search, Button } from '../UI';
import Navigation from '../Nav';
import { FirebaseContext } from '../../firebase';

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.a`
  color: var(--secondary);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', serif;
  margin-right: 2rem;
`;

const Header = () => {
  const { user, firebase } = React.useContext(FirebaseContext);

  const onLogOut = async () => {
    await firebase.LogOut();
  };

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--gray);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <Link href="/">
            <Logo>P</Logo>
          </Link>
          {/* Buscador aquí */}
          <Search />

          {/* Nav aquí */}
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                {`Hola: ${user.displayName}`}
              </p>
              <Button type="button" bgColor onClick={onLogOut}>
                Cerrar sesión
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor>SignUP</Button>
              </Link>
              <Link href="/register">
                <Button>SignIN</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
