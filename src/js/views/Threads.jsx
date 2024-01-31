import React, { useContext, useEffect, useState } from "react";
import Markdown from "react-markdown";
// https://github.com/remarkjs/react-markdown
import { useParams } from "react-router";

import { Context } from "../store/appContext";
import Post from "../component/Post.jsx";
import { Link } from "react-router-dom";

const Threads = () => {
  const { store, actions } = useContext(Context);
  const { thread_id } = useParams();

  useEffect(() => {
    actions.threads.read(thread_id);
  }, []);

  return (
    <div className="container d-flex flex-column gap-3">
      <section className="thread d-flex flex-column gap-3">
        <h1 id={`thread-${store.current_thread.id}`}>
          {store.current_thread.title}
        </h1>
        <Markdown>{store.current_thread.content}</Markdown>
        <small>{store.current_thread.user?.username}</small>
        {store.current_thread.posts?.map((p) => (
          <section id={`post-${p.id}`} key={p.id}>
            <hr />
            <Markdown>{p.content}</Markdown>
            <Link to={`#post-${p.id}`}>
              <small>{p.user.username}</small>
            </Link>
          </section>
        ))}
      </section>
      <section>
        <Post onSubmit={() => actions.threads.read(thread_id)} />
      </section>
      <small>
        <Link to={`#thread-${store.current_thread.id}`}>Top</Link>
      </small>
    </div>
  );
};

export { Threads };
