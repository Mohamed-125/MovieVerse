import React, { useContext, useEffect, useRef } from "react";
import "./NavBarMobile.css";
import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBarMobile = ({ isMobileNavOpen, setIsMobileNavOpen }) => {
  const mobileNavRef = useRef();

  useEffect(() => {
    isMobileNavOpen &&
      mobileNavRef.current.style.setProperty(
        "transform",
        `translateY(calc(0vh + 6rem))`
      );
  }, [isMobileNavOpen]);
  const clickHandler = () => setIsMobileNavOpen((pre) => !pre);
  return (
    <div ref={mobileNavRef} className="Mobile-nav-div">
      <div className="nav__mobile_links_button_contener">
        <div className="nav__mobile_links_div">
          <Link onClick={clickHandler} to={"/"}>
            Home
          </Link>
          <Link onClick={clickHandler} to={"/movie/Popular/more"}>
            Popular Movies
          </Link>
          <Link onClick={clickHandler} to={"/"}>
            Popular Tv Shows
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBarMobile;
