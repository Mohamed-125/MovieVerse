import React from "react";
import "./ScrollTop.css";
const ScrollTop = () => {
  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
  };
  return (
    <div onClick={scrollTop} className="scrollTop__div">
      <p>→</p>
    </div>
  );
};

export default ScrollTop;
