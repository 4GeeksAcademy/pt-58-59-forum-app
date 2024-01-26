import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Context } from "../store/appContext";

const Threads = () => {
  const { store, actions } = useContext(Context);
  const { thread_id } = useParams();

  useEffect(() => {
    actions.threads.read(thread_id);
  }, []);

  return (
    <div className="container d-flex flex-column gap-3">
      <section className="thread d-flex flex-column gap-3">
        <h1>{store.current_thread.title}</h1>
        <p>{store.current_thread.content}</p>
        <small>{store.current_thread.user?.username}</small>
        {store.current_thread.posts?.map((p) => (
          <section key={p.id}>
            <hr />
            <p>{p.content}</p>
            <small>{p.user.username}</small>
          </section>
        ))}
      </section>
    </div>
  );
};

export { Threads };
