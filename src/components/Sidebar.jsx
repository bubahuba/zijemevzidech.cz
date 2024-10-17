import React, { useEffect, useState } from "react";
import { styles, defaultColor } from "./mapAssets";
import { Logo } from "./Logo";
import { Link, useParams } from "react-router-dom";
import { SunspotLoader } from "../node_modules/react-awesome-loaders";

export const Sidebar = ({ navItems, currentItem }) => {
  const [menuOpened, setMenuOpened] = useState(false);
  const closeMenu = () => setMenuOpened(false);
  const { entry } = useParams()

  useEffect(() => closeMenu(), [currentItem, entry])

  const handleMenuOpen = () => {
    setMenuOpened(!menuOpened)
  }

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
      <nav style={{ top: 165 }}
        className={
          menuOpened
            ? "w-nav-menu w-clearfix nav-menu opened"
            : "w-nav-menu w-clearfix nav-menu"
        }
        role="navigation"
      >
        <ul>
          <Link to={'/map'}
            key='map'
            className={"w-nav-link nav-link"}
          >
            Otevřené DVOrky a DOmy
          </Link>
          {!navItems.length && <SunspotLoader
          className={"w-nav-link nav-link"}
        gradientColors={["#00a4d5", "transparent"]}
        shadowColor={"#00000040"}
        desktopSize={"40px"}
        mobileSize={"40px"}
    />}
          {(navItems.length > 0) && (
            navItems.map((item, i) => (
              <Link to={'/' + item.slug}
                key={i}
                state={{title: item.title}}
                className={
                  currentItem === item.slug
                    ? "active w-nav-link nav-link"
                    : "w-nav-link nav-link"
                }
                style={currentItem === item.slug ? styles.active : null}
              >
                {item.title}
              </Link>
            ))
          )}
        </ul>
      </nav>
      <div className="w-nav-overlay" />
    </div>
  )
};
