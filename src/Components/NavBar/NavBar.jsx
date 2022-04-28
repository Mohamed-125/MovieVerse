import React, { useRef, useState, createContext, useEffect } from "react";
import "./NavBar.css";
import NavBarMobile from "./NavBarMobile";
import { Link } from "react-router-dom";
// context api to sent the the state to the navBar mobile component
export const isMobileNavOpenContext = createContext();
const NavBar = () => {
  //ref to the mobile menu icon
  const mobileNavDivRef = useRef();

  // state to set is the menu open or closed
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const [firstRender, setFirstRender] = useState(false);
  useEffect(() => {
    if (isMobileNavOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    if (firstRender) {
      mobileNavDivRef.current.classList.toggle("nav__mobile_icon_close");
    } else {
      setFirstRender(true);
    }
  }, [isMobileNavOpen]);
  const NavMobileClickHandler = () => {
    setIsMobileNavOpen((pre) => !pre);
  };

  return (
    <nav className="nav__nav section__padding">
      <div className="nav__contener">
        <div className="nav__logo_div">
          <h2>MovieVerse</h2>
        </div>
        {window.innerWidth > 700 ? (
          <>
            <div className="nav__links_div">
              <Link to={"/"}>Home</Link>
              <Link to={"/movie/Popular/more"}>Popular Movies</Link>
              <Link to={"/"}>Popular Tv Shows</Link>
            </div>
          </>
        ) : (
          <>
            <div
              ref={mobileNavDivRef}
              onClick={NavMobileClickHandler}
              className="nav__mobile_icon"
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            {isMobileNavOpen ? (
              <NavBarMobile
                isMobileNavOpen={isMobileNavOpen}
                setIsMobileNavOpen={setIsMobileNavOpen}
              />
            ) : null}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
