import React, { useEffect, useState } from "react";
import { styles, defaultColor } from "./mapAssets";
import { Logo } from "./Logo";
import { Link, useParams } from "react-router-dom";
import { SunspotLoader } from "../node_modules/react-awesome-loaders";
import trebic from "../images/trebic.jpg";

export const Sidebar = ({ navItems, currentItem }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const closeMenu = () => {
    setMenuOpened(false);
    document.body.classList.remove("blur");
  };
  const { entry, category } = useParams();

  useEffect(() => closeMenu(), [currentItem, entry, category]);

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened);
    if (menuOpened) {
      document.body.classList.remove("blur");
    } else {
      document.body.classList.add("blur");
    }
  };

  return (
    <div className="w-nav nav-bar">
      <div
        className="w-nav-button menu-button"
        style={styles.menubutton}
        onClick={handleMenuOpen}
      >
        <div className="w-icon-nav-menu" />
      </div>
      <span className="brand">
        <Logo currentColor={defaultColor} height={60} />
      </span>
      <nav
        className={
          menuOpened
            ? "w-nav-menu w-clearfix nav-menu opened"
            : "w-nav-menu w-clearfix nav-menu"
        }
        role="navigation"
        style={{
          display: "flex",
          flexDirection: "column",
          top: 165,
          justifyContent: "space-between",
        }}
        onClick={handleMenuOpen}
      >
        <ul>
          <Link to={"/map"} key="map" className={"w-nav-link nav-link"}>
            Otevřené DVOrky a DOmy
          </Link>
          {!navItems?.length && (
            <SunspotLoader
              className={"w-nav-link nav-link"}
              gradientColors={["#00a4d5", "transparent"]}
              shadowColor={"#00000040"}
              desktopSize={"40px"}
              mobileSize={"40px"}
            />
          )}
          {navItems?.length > 0 &&
            navItems.map((item, i) => (
              <Link
                to={"/" + item.slug}
                key={i}
                state={{ title: item.title }}
                className={
                  currentItem === item.slug
                    ? "active w-nav-link nav-link"
                    : "w-nav-link nav-link"
                }
                style={currentItem === item.slug ? styles.active : null}
              >
                {item.title}
              </Link>
            ))}
        </ul>
        <a href="https://www.trebic.cz/" target="_blank" rel="noreferrer">
          <img
            src={trebic}
            alt="Podopra město Trebic"
            style={{
              width: "100%",
              maxHeight: "20vh",
              objectFit: "contain",
              backgroundColor: "#b42016",
            }}
          />
        </a>
      </nav>
    </div>
  );
};
