import React, { useEffect } from "react";
import "../../App.css";
import constructionCat from "../../assets/cuteConstructionCat.jpg"

const InProgress = () => {
  return (
    <div className="container centering">
      <h1 className="heading">WORK IN PROGRESS</h1>
      <p className="paragraph">Page is under construction</p>
      <img src={constructionCat} style={{ width: "200px", height: "auto" }} />
    </div>
  );
};

export default InProgress;
