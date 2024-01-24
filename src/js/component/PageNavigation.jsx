import React from "react";

const PageNavigation = ({ page, onClickLeft, onClickRight }) => {
  return (
    <section className="page-navigation row">
      <div className="col col-8 offset-2 d-flex flex-row justify-content-around gap-3">
        <button onClick={onClickLeft} className="btn btn-primary">
          <i class="fa-solid fa-angles-left"></i>
        </button>
        <div>{page ? page : 1}</div>
        <button onClick={onClickRight} className="btn btn-primary">
          <i class="fa-solid fa-angles-right"></i>
        </button>
      </div>
    </section>
  );
};

export default PageNavigation;
