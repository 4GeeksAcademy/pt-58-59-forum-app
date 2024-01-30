import React, { useState } from "react";
import { ContextReplacementPlugin } from "webpack";

const NewThread = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  return (
    <div className="container d-flex flex-column gap-3">
      <form onSubmit={(ev) => handleSubmit(ev)}>
        <label htmlFor="newthread-title">Title:</label>
        <input type="text" id="newthread-title" />
        <label htmlFor="newthread-cont">Content:</label>
        <textarea id="newthread-cont" cols="30" rows="10"></textarea>
      </form>
    </div>
  );
};

export { NewThread };
