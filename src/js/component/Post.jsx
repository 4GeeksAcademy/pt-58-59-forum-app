import React, { useContext, useState } from "react";
import { AuthComponent } from "./RequireAuth.jsx";
import { Context } from "../store/appContext.js";
import { useParams } from "react-router";

const Post = ({ onSubmit }) => {
  const { thread_id } = useParams();
  const { actions } = useContext(Context);

  const [content, setContent] = useState("");

  return (
    <AuthComponent>
      <form
        onSubmit={async (ev) => {
          ev.preventDefault();
          if (!content) {
            return;
          }
          await actions.posts.create(thread_id, content);
          setContent("");
          onSubmit();
        }}
        className="d-flex flex-column gap-3"
      >
        <label htmlFor="newpost-cont">Content:</label>
        <textarea
          id="newpost-cont"
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
              setContent("");
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </AuthComponent>
  );
};

export default Post;
