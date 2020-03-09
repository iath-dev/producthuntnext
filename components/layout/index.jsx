import React from 'react';
import PropTypes from 'prop-types';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --primary: #3d3d3d;
            --primary-light: #6f6f6f;
            --gray: #e1e1e1;
            --secondary: #da552f;
          }

          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }

          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }

          body {
            font-size: 1.6rem;
            line-height: 1.5;
            font-family: 'PT Sans Narrow', sans-serif;
          }

          h1,
          h2,
          h3 {
            margin: 0 0 2rem 0;
            line-height: 1.5;
          }

          h1,
          h2 {
            font-family: 'Roboto Slab', serif;
            font-weight: 700;
          }

          h3 {
            font-family: 'PT Sans Narrow', sans-serif;
          }

          ul {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          a {
            text-decoration: none;
          }

          img {
            max-width: 100%;
          }
        `}
      />
      <Head>
        <html lang="es" />
        <title>Product Hunt Firebase y Next.js</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha256-l85OmPOjvil/SOvVt3HnSSjzF1TUMyT9eV0c2BzEGzU="
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700|Roboto+Slab:400,700&display=swap"
          rel="stylesheet"
        />
        <link href="/static/css/app.css" rel="stylesheet" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
