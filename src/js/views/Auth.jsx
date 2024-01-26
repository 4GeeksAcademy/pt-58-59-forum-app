import React, { useContext, useState, useRef } from "react";
import { Context } from "../store/appContext";

import "../../styles/auth.css";
import { useNavigate } from "react-router";

const Auth = () => {
  const nav = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const formElement = useRef(null);

  const { actions } = useContext(Context);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const formData = new FormData(formElement.current);
    if (isLogin) {
      await actions.auth.login(formData);
    } else {
      await actions.auth.signup(formData);
    }

    nav("/");
  };

  return (
    <div className="container d-flex flex-column gap-3">
      <section className="auth-form">
        <h1 className="login-title" onClick={() => setIsLogin(!isLogin)}>
          <span style={{ opacity: isLogin ? 1 : 0.5 }}>Login</span>/
          <span style={{ opacity: isLogin ? 0.5 : 1 }}>Sign Up</span>
        </h1>
        <form
          className="d-flex flex-column gap-3"
          ref={formElement}
          onSubmit={(ev) => handleSubmit(ev)}
        >
          <span>
            <label htmlFor="auth-usr" className="form-label">
              Username:
            </label>
            <input
              id="auth-usr"
              className="form-control form-control-lg"
              type="text"
              name="username"
              autoComplete="username"
              aria-label=".form-control-lg example"
            />
          </span>
          {isLogin ? (
            ""
          ) : (
            <span>
              <label htmlFor="auth-email" className="form-label">
                Email:
              </label>
              <input
                id="auth-email"
                className="form-control form-control-lg"
                type="email"
                name="email"
                autoComplete="email"
                aria-label=".form-control-lg example"
              />
            </span>
          )}
          <span>
            <label htmlFor="auth-pwd" className="form-label">
              Password:
            </label>
            <input
              id="auth-pwd"
              className="form-control form-control-lg"
              type="password"
              name="password"
              autoComplete={isLogin ? "current-password" : "new-password"}
              aria-label=".form-control-lg example"
            />
          </span>
          <div className="d-flex justify-content-center">
            {isLogin ? (
              <button className="btn btn-primary">Log In</button>
            ) : (
              <button className="btn btn-primary">Sign Up</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export { Auth };
