import React from 'react';
import { css } from '@emotion/core';

const Error404 = () => (
  <h1
    css={css`
      margin-top: 5rem;
      text-align: center;
      color: red;
    `}
  >
    No se puede mostrar
  </h1>
);

export default Error404;
