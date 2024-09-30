import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SunspotLoader } from "react-awesome-loaders";
import { Logo } from "./Logo";
import { renderToString } from "react-dom/server";

export const defaultColor = window.defaultColor;

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
  path: "M11.069,2.444c-4.275,0-7.753,3.464-7.753,7.722c0,4.261,3.478,7.727,7.753,7.727s7.753-3.466,7.753-7.727C18.82,5.908,15.342,2.444,11.069,2.444z M11.069,16.436c-3.467,0-6.288-2.812-6.288-6.27c0-3.456,2.821-6.267,6.288-6.267c3.465,0,6.286,2.811,6.288,6.266C17.357,13.624,14.536,16.436,11.069,16.436z M16.357,10.167c0,2.906-2.372,5.27-5.288,5.27s-5.288-2.364-5.288-5.27c0-2.904,2.372-5.267,5.288-5.267C13.983,4.9,16.355,7.263,16.357,10.167z",
  fillColor: "#FF0DD1",
  fillOpacity: 1,
  anchor: { x: 10, y: 10 },
  strokeWeight: 0,
  scale: 1,
};

export const getLanLng = (latlng) => {
  var tmp = latlng.split(",");
  return {
    lat: parseFloat(tmp[0]),
    lng: parseFloat(tmp[1]),
  };
};

export const getGallery = (item) => {
  const _return = [];
  item[4] && _return.push(item[4]);
  item[5] && _return.push(item[5]);
  item[6] && _return.push(item[6]);
  item[7] && _return.push(item[7]);
  return _return;
};

const listenForOutsideClicks = (
  listening,
  setListening,
  menuRef,
  setIsOpen
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
    listenForOutsideClicks(listening, setListening, menuRef, setIsOpen)
  );

  return (
    <div style={{ position: "relative" }}>
      <p
        style={{ visibility: isOpen ? "hidden" : "visible" }}
        onClick={() => setTimeout(() => setIsOpen(true), 200)}
      >
        {list}
      </p>
      <ul
        style={{
          display: isOpen ? "block" : "none",
        }}
        className="dropdown"
        ref={menuRef}
      >
        {options.map((listOption) => {
          return (
            <li key={listOption}>
              <Link
                to={"/odvodo/" + listOption}
                className={list === listOption ? "active" : ""}
                style={{
                  color: list === listOption ? defaultColor : "inherit",
                }}
                onClick={() => setIsOpen(false)}
              >
                {listOption}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const getImage = (url, title = "") => {
  return (
    <a
      href={`https://lh3.googleusercontent.com/d/${url}`}
      data-fslightbox={title}
    >
      <img
        src={`https://lh3.googleusercontent.com/d/${url}=w300`}
        alt={title}
        className="thumb"
      />
    </a>
  );
};

export const getInfoWindowContent = (item) => {
  const mappedItem = {
    name: item[0],
    address: item[1],
    text: item[3],
    gallery: getGallery(item),
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
      {mappedItem.gallery.length > 0 && (
        <div className="gallery">
          {getImage(mappedItem.gallery[0], mappedItem.name)}
          {mappedItem.gallery[1] &&
            getImage(mappedItem.gallery[1], mappedItem.name)}
          {mappedItem.gallery[2] &&
            getImage(mappedItem.gallery[2], mappedItem.name)}
          {mappedItem.gallery[3] &&
            getImage(mappedItem.gallery[3], mappedItem.name)}
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
          <Link to="/odvodo" style={{ textDecoration: "none" }}>
            Otevřené dvorky a domy
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
        {navigator.geolocation && (
          <li
            className={
              allowGPS ? "w-nav-link nav-link octive" : "w-nav-link nav-link "
            }
            onClick={() => toggleMyGPS(allowGPS)}
            style={allowGPS ? styles.active : null}
            key="gps"
          >
            {allowGPS ? menuIconGpsOn(gpsLoading) : menuIconGpsOff()}
            Moje poloha
          </li>
        )}

        {!navItems.length && (
          <SunspotLoader
            className={"w-nav-link nav-link"}
            gradientColors={["#00a4d5", "transparent"]}
            shadowColor={"#00000040"}
            desktopSize={"40px"}
            mobileSize={"40px"}
          />
        )}
        {navItems.map((item, i) => (
          <li
            key={i}
            className={
              markerOpen === i
                ? "active w-nav-link nav-link"
                : "w-nav-link nav-link"
            }
            onClick={() => handleToggleOpen(i, item)}
            style={markerOpen === i ? styles.active : null}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </nav>
    <div className="w-nav-overlay" />
  </div>
);
