import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router";
import { AuthPage } from "../component/RequireAuth.jsx";

const NewThread = () => {
  const { actions } = useContext(Context);
  const nav = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!title) {
      return;
    }
    let data = await actions.threads.create(title, content);
    nav(`/thread/${data.id}`);
  };

  return (
    <AuthPage>
      <div className="container d-flex flex-column justify-content-center gap-3">
        <form
          className="d-flex flex-column justify-content-center gap-3"
          onSubmit={(ev) => handleSubmit(ev)}
        >
          <label htmlFor="newthread-title">Title:</label>
          <input
            id="newthread-title"
            type="text"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <label htmlFor="newthread-cont">Content:</label>
          <textarea
            id="newthread-cont"
            value={content}
            onChange={(ev) => setContent(ev.target.value)}
            cols="30"
            rows="10"
          ></textarea>
          <div className="d-flex justify-content-center gap-3 w-100">
            <button className="btn btn-primary">Submit</button>
            <button
              type="reset"
              className="btn btn-danger"
              onClick={() => {
                nav(-1);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AuthPage>
  );
};

export { NewThread };
