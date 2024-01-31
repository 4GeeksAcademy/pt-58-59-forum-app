import React from "react";
import { Link } from "react-router-dom";
import { CondAuthElem } from "./RequireAuth.jsx";

export const Navbar = () => {
  return (
    <nav className="navbar mb-3">
      <Link to="/">
        <span className="navbar-brand mb-0 h1">Cat Forum</span>
      </Link>
      <div className="ml-auto">
        <CondAuthElem
          loggedInElem={
            <>
              <h1 className="btn btn-secondary">Hello user!</h1>
            </>
          }
          loggedOutElem={
            <Link to="/login">
              <button className="btn btn-primary">Login/Sign Up</button>
            </Link>
          }
        />
      </div>
    </nav>
  );
};
