import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const Nav = styled.nav`
  padding-left: 2rem;

  a {
    font-size: 1.2rem;
    margin-left: 2rem;
    color: var(--primary-light);
    font-family: 'PT Sans', sans-serif;

    &:last-of-type {
      margin-right: 0;
    }
  }
`;

const Navigation = () => {
  const user = true;

  return (
    <Nav>
      <Link href="/">Inicio</Link>
      <Link href="/popular">Populares</Link>
      {user && <Link href="/add">Nuevo Producto</Link>}
    </Nav>
  );
};

export default Navigation;
