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
        Producto no existente
    </h1>
);
 
export default Error404;
