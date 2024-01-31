import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const AuthComponent = ({ children }) => {
  const { store } = useContext(Context);

  return <>{store.access_token ? children : ""}</>;
};

const CondAuthElem = ({ loggedInElem, loggedOutElem }) => {
  const { store } = useContext(Context);

  return <>{store.access_token ? loggedInElem : loggedOutElem}</>;
};

const AuthPage = ({ children }) => {
  const { store } = useContext(Context);
  const nav = useNavigate();

  useEffect(() => {
    if (!store.access_token) {
      nav("/");
    }
  }, []);

  return <>{children}</>;
};

export { AuthPage, AuthComponent, CondAuthElem };
