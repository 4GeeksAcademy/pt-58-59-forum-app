import React from "react";
import { Link } from "react-router-dom";

const ThreadPreview = ({ thread }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-4">
          <img
            src="http://placekitten.com/150/200"
            className="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div className="col-8">
          <div className="card-body">
            <h5 className="card-title">
              <Link to={`/thread/${thread.id}`}>{thread.title}</Link>
            </h5>
            <p className="card-text">{thread.content}</p>
            <Link to={`/thread/${thread.id}`}>
              <p className="card-text">
                <small className="text-body-secondary">Read more!</small>
              </p>
            </Link>
            <p className="card-text">
              <small className="text-body-secondary">
                A post by {thread.user.username}.
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPreview;
