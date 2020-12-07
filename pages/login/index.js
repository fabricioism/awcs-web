import React from "react";
import Head from "next/head";
import { LoginView } from "../../components/views";
import { PublicRoute } from "../../components/routing";

const login = () => {
  return (
    <PublicRoute>
      <Head>
        <title>Inicio de sesión | Adventure Works Cycle</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginView />
    </PublicRoute>
  );
};

export default login;
