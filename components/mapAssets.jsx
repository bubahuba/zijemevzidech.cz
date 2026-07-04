"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { SunspotLoader } from "./SunspotLoader";
import { Logo } from "./Logo";
import { renderToString } from "react-dom/server";
import { DEFAULT_COLOR } from "@/lib/constants";

export const defaultColor = DEFAULT_COLOR;

export const styles = {
  active: {
    backgroundColor: defaultColor,
    color: "white",
  },
  menubutton: {
    color: defaultColor,
  },
  mapa: {
    width: "100%",
    height: "100%",
  },
};

export const mapStyles = [
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        saturation: 9,
      },
      {
        invert_lightness: true,
      },
      {
        gamma: 1.92,
      },
      {
        weight: 5.11,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#FFFFFF",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        weight: 0.1,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },
      {
        weight: 0.6,
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },
      {
        weight: 0.44,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#ccc7c4",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },
      {
        weight: 0.29,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station.airport",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station.airport",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#93bda2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: defaultColor,
      },
      {
        visibility: "on",
      },
    ],
  },
];

export const mapStylesDark = [
  {
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#222222",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        saturation: 9,
      },
      {
        invert_lightness: true,
      },
      {
        gamma: 1.92,
      },
      {
        weight: 5.11,
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },
      {
        weight: 0,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
      {
        weight: 0.1,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: defaultColor,
      },
      {
        visibility: "on",
      },
      {
        weight: 1,
      },
    ],
  },
  {
    featureType: "poi",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
      {
        weight: 0.44,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        visibility: "on",
      },
      {
        weight: 0.29,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry.fill",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.station.airport",
    stylers: [
      {
        visibility: "on",
      },
    ],
  },
  {
    featureType: "transit.station.airport",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: defaultColor,
      },
      {
        visibility: "on",
      },
    ],
  },
];

export const defaultMapCenter = {
  // default map center
  lat: 49.2177523,
  lng: 15.8794353,
};

export const iconActive = (dark) => ({
  path: "M26.931,14.891c0,6.7-12.132,22.229-12.132,22.229S2.667,21.591,2.667,14.891 C2.667,8.19,8.1,2.759,14.799,2.759C21.5,2.759,26.931,8.19,26.931,14.891z M14.799,12.854c-1.15,0-2.083,0.929-2.083,2.075 c0,1.146,0.933,2.076,2.083,2.076s2.083-0.929,2.083-2.076C16.881,13.783,15.949,12.854,14.799,12.854z",
  fillColor: dark ? "#000000" : "#FFFFFF",
  strokeColor: defaultColor,
  fillOpacity: 1,
  anchor: { x: 15, y: 40 },
  strokeWeight: 4,
  scale: 1.2,
});

export const icon = {
  path: "M26.931,14.891c0,6.7-12.132,22.229-12.132,22.229S2.667,21.591,2.667,14.891 C2.667,8.19,8.1,2.759,14.799,2.759C21.5,2.759,26.931,8.19,26.931,14.891z M14.799,12.854c-1.15,0-2.083,0.929-2.083,2.075 c0,1.146,0.933,2.076,2.083,2.076s2.083-0.929,2.083-2.076C16.881,13.783,15.949,12.854,14.799,12.854z",
  fillColor: defaultColor,
  strokeColor: "#FFFFFF",
  fillOpacity: 1,
  anchor: { x: 15, y: 34 },
  strokeWeight: 4,
  scale: 1,
};

export const menuIconGpsOn = (active) => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      enableBackground="new 0 0 20 20"
      style={{ marginRight: 14, verticalAlign: "middle" }}
      fill="currentColor"
      className={active ? "rotate" : undefined}
    >
      <path
        d="M19.951,8.973h-2.025c-0.464-3.588-3.31-6.435-6.898-6.897V0.049H8.973v2.026C5.384,2.539,2.539,5.384,2.075,8.973H0.049
            v2.055h2.026c0.463,3.589,3.309,6.435,6.897,6.898v2.025h2.055v-2.025c3.589-0.464,6.435-3.31,6.898-6.898h2.025V8.973z M16.216,10
            c0,3.428-2.788,6.216-6.216,6.216c-3.427,0-6.216-2.788-6.216-6.216c0-3.427,2.789-6.216,6.216-6.216
            C13.428,3.784,16.216,6.573,16.216,10z M14.021,10c0,2.221-1.801,4.021-4.021,4.021c-2.222,0-4.021-1.801-4.021-4.021
            c0-2.222,1.799-4.021,4.021-4.021C12.221,5.979,14.021,7.778,14.021,10z"
      />
    </svg>
  );
};

export const menuIconGpsOff = () => {
  return (
    <svg
      width="20px"
      height="20px"
      viewBox="0 0 20 20"
      enableBackground="new 0 0 20 20"
      style={{ marginRight: 14, verticalAlign: "middle" }}
      fill="currentColor"
    >
      <path
        d="M19.951,8.973h-2.025c-0.464-3.588-3.31-6.435-6.898-6.897V0.049H8.973v2.026C5.384,2.539,2.539,5.384,2.075,8.973H0.049
	v2.055h2.026c0.463,3.589,3.309,6.435,6.897,6.898v2.025h2.055v-2.025c3.589-0.464,6.435-3.31,6.898-6.898h2.025V8.973z M16.216,10
	c0,3.428-2.788,6.216-6.216,6.216c-3.427,0-6.216-2.788-6.216-6.216c0-3.427,2.789-6.216,6.216-6.216
	C13.428,3.784,16.216,6.573,16.216,10z"
      />
    </svg>
  );
};

export const iconGPS = {
  path: 0,
  fillColor: "#FF0DD1",
  fillOpacity: 1,
  strokeColor: "#FFFFFF",
  strokeWeight: 2,
  scale: 10,
};

export const getLanLng = (latlng) => {
  var tmp = latlng.split(",");
  return {
    lat: parseFloat(tmp[0]),
    lng: parseFloat(tmp[1]),
  };
};

export const getGallery = (galerie) => {
  return galerie;
};

const listenForOutsideClicks = (
  listening,
  setListening,
  menuRef,
  setIsOpen,
) => {
  return () => {
    if (listening) return;
    if (menuRef.current === null) return;
    setListening(true);
    [`click`, `touchstart`].forEach((type) => {
      document.addEventListener(type, (evt) => {
        if (menuRef.current === null) return;
        if (menuRef.current.contains(evt.target)) return;
        setIsOpen(false);
      });
    });
  };
};

export const Dropdown = ({ list, options }) => {
  const menuRef = useRef(null);
  const [listening, setListening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() =>
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen),
  );

  if (!list)
    return (
      <div>
        <SunspotLoader
          className={"w-nav-link nav-link"}
          gradientColors={["#00a4d5", "transparent"]}
          shadowColor={"#00000040"}
          desktopSize={"40px"}
          mobileSize={"40px"}
        />
      </div>
    );
  return (
    <div className="map-dropdown" style={{ position: "relative" }}>
      <button
        type="button"
        className="map-dropdown-toggle"
        style={{ visibility: isOpen ? "hidden" : "visible" }}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={() => setTimeout(() => setIsOpen(true), 200)}
      >
        {list.title}
        <span
          className="map-dropdown-chevron w-icon-slider-right"
          aria-hidden="true"
        />
      </button>
      <ul
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="dropdown"
        ref={menuRef}
      >
        {options.map((listOption) => {
          return (
            <li key={listOption.slug}>
              <Link
                href={"/map/" + listOption.slug}
                className={list.slug === listOption.slug ? "active" : ""}
                style={{
                  color:
                    list.slug === listOption.slug ? defaultColor : "inherit",
                }}
                onClick={() => setIsOpen(false)}
              >
                {listOption.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const getImage = (item, title = "", index) => {
  return (
    <a href={item.large} data-fslightbox={title} key={index}>
      <img src={item.small} alt={title} className="thumb" />
    </a>
  );
};

export const getInfoWindowContent = (item) => {
  const mappedItem = {
    name: item.title,
    address: item.intro,
    text: item.fulltext,
    gallery: getGallery(item.galerie),
  };

  const _content = (
    <div className="infobox">
      <h2>{mappedItem.name}</h2>
      <h3>{mappedItem.address}</h3>
      {mappedItem.text && (
        <div
          className="html"
          dangerouslySetInnerHTML={{ __html: mappedItem.text }}
        />
      )}
      {mappedItem.gallery[0] && (
        <div className="gallery">
          {mappedItem.gallery.map((item, i) =>
            getImage(item, mappedItem.name, i),
          )}
        </div>
      )}
    </div>
  );
  return {
    content: renderToString(_content),
    pane: "floatPane",
    closeBoxMargin: "20px",
    pixelOffset: { width: -200, height: 0 },
    disableAutoPan: false,
    enableEventPropagation: false,
  };
};

export const SidebarComponent = ({
  allowGPS,
  gpsLoading,
  handleMenuOpen,
  handleToggleOpen,
  list,
  lists,
  markerOpen,
  menuOpened,
  navItems,
  toggleMyGPS,
}) => (
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
      <span>
        <h1>
          <Link href="/map" style={{ textDecoration: "none", fontWeight: 300 }}>
            <b>O</b>tevřené <b>Dvo</b>rky a <b>Do</b>my
          </Link>
        </h1>
        <Dropdown list={list} options={lists} />
      </span>
    </span>
    <nav
      className={
        menuOpened
          ? "w-nav-menu w-clearfix nav-menu opened"
          : "w-nav-menu w-clearfix nav-menu"
      }
      role="navigation"
    >
      <ul>
        {typeof navigator !== "undefined" && navigator.geolocation && (
          <li
            className={
              allowGPS ? "w-nav-link nav-link octive" : "w-nav-link nav-link "
            }
            onClick={(ev) => {
              ev.stopPropagation();
              toggleMyGPS(allowGPS);
            }}
            style={allowGPS ? styles.active : null}
            key="gps"
          >
            {allowGPS ? menuIconGpsOn(gpsLoading) : menuIconGpsOff()}
            Moje poloha
          </li>
        )}

        {!navItems.length && (
          <li className="w-nav-link nav-link">
            <SunspotLoader
              className={"w-nav-link nav-link"}
              gradientColors={["#00a4d5", "transparent"]}
              shadowColor={"#00000040"}
              desktopSize={"40px"}
              mobileSize={"40px"}
            />
          </li>
        )}
        {navItems.map((item, i) => (
          <li
            key={i}
            className={
              markerOpen === i
                ? "active w-nav-link nav-link"
                : "w-nav-link nav-link"
            }
            onClick={(ev) => {
              ev.stopPropagation();
              handleToggleOpen(i, item);
            }}
            style={markerOpen === i ? styles.active : null}
          >
            {item.title}
          </li>
        ))}
      </ul>

      <a
        href="https://www.trebic.cz/"
        target="_blank"
        rel="noreferrer"
        className="trebic-link"
      >
        <img
          src="/images/trebic.jpg"
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
