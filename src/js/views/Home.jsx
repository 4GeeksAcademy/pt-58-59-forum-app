import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext.js";

import ThreadPreview from "../component/ThreadPreview.jsx";
import PageNavigation from "../component/PageNavigation.jsx";
import { AuthComponent } from "../component/RequireAuth.jsx";

import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [page, setPage] = useState(0);

  const decrPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const incrPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    // if (params.has("page")) {
    //   setPage(parseInt(params.get("page")));
    // }
    actions.threads.readMany(10, page * 10);
    // const url = new URL(window.location.href);
    // url.searchParams.set("page", page + 1);
    // window.history.pushState({}, "", url.href);
  }, [page]);

  return (
    <div className="container d-flex flex-column gap-3">
      <section className="thread-list row">
        <div className="col col-12 d-flex flex-column justify-content-around gap-3">
          <PageNavigation
            page={page + 1}
            onClickLeft={decrPage}
            onClickRight={incrPage}
          />
          <AuthComponent>
            <Link className="btn btn-primary" to="/thread/new">
              Create A Thread
            </Link>
          </AuthComponent>
          {store.threads.map((thread) => (
            <ThreadPreview thread={thread} key={thread.id} />
          ))}
          <PageNavigation
            page={page + 1}
            onClickLeft={decrPage}
            onClickRight={incrPage}
          />
        </div>
      </section>
    </div>
  );
};
