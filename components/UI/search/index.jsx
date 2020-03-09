import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';

const InputText = styled.input`
  border: 1px solid var(--gray);
  padding: 1rem;
  min-width: 300px;
`;

const InputSubmit = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/buscar.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1px;
  background-color: white;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

const Search = () => {
  const [search, setSearch] = React.useState('');
  const router = useRouter();

  const handleSearch = e => {
    e.preventDefault();

    if (search.trim() === '') return null;

    return router.push({
      pathname: '/search',
      query: { q: search },
    });
  };

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={handleSearch}
    >
      <InputText
        type="text"
        placeholder="Buscar productos..."
        onChange={e => setSearch(e.target.value)}
      />
      <InputSubmit type="submit">buscar</InputSubmit>
    </form>
  );
};

export default Search;
