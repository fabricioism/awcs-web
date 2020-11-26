import React from "react";
import { LoginView } from "../../components/views";
import { PublicRoute } from "../../components/routing";

const login = () => {
  return (
    <PublicRoute>
      <LoginView />
    </PublicRoute>
  );
};

export default login;
