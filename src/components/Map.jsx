import { useCallback, useEffect, useRef, useState } from 'react';
import { SidebarComponent, mapStylesDark, mapStyles, getInfoWindowContent, getLanLng, defaultMapCenter, styles, iconGPS, iconActive, icon } from './mapAssets';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from '@react-google-maps/api';

export const Map = ({ entries, lists, list, router }) => {
    const getPreferredColorScheme = () => {

        if (window.matchMedia) {
            if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    const [gpsLoading, setGpsLoading] = useState(false);
    const [markers, setMarkers] = useState([]);
    const [dark, setDark] = useState(getPreferredColorScheme())
    const [navItems, setNavItems] = useState([])
    const [markerOpen, setMarkerOpen] = useState(null)
    const [menuOpened, setMenuOpened] = useState(false)
    const [myGPS, setMyGPS] = useState(false)
    const [allowGPS, setAllowGPS] = useState(false)
    const [firstTrack, setFirstTrack] = useState(false)
    const [FStoggler, setFStoggler] = useState(false)
    const [FSslide, setFSslide] = useState(1)
    const [_map, setMap] = useState(null)

    const handleToggleOpen = (i, item) => {
        closeMenu();
        setMarkerOpen(markerOpen === i ? null : i)
        setTimeout(() => window.refreshFsLightbox(), 400)
        var activeMenu = document.querySelector("nav li.active");
        if (item) window.gtag("event", "page_view", { page_title: item.title });
        return activeMenu !== null ? activeMenu.scrollIntoView() : "";
    };

    const handleMenuOpen = () => {
        setMenuOpened(!menuOpened);
    };

    const closeMenu = () => {
        setMenuOpened(false);
    };

    const panMap = (latlng) => {
        return _map.panTo(latlng);
    };

    const getMyGPS = useCallback((gpsAllow) => {
        setGpsLoading(true)
        var GPSoptions = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
        };
        var geoSuccess = (position) => {
            var thisPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            if (firstTrack) {
                setGpsLoading(false)
                panMap(thisPos);
                setMarkerOpen(null)
                closeMenu();
            }
            setMyGPS(thisPos)
            setFirstTrack(false)
        };
        var geoError = (error) => {
            console.log("Error occurred. Error code: " + error.code);
            // error.code can be:
            //   0: unknown error
            //   1: permission denied
            //   2: position unavailable (error response from location provider)
            //   3: timed out
        };
        var process;
        if (gpsAllow) {
            setFirstTrack(true)
            process = navigator.geolocation.watchPosition(
                geoSuccess,
                geoError,
                GPSoptions
            );
        } else {
            navigator.geolocation.clearWatch(process);
        }
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleMyGPS = (currentGPS) => {
        setAllowGPS(!currentGPS)
        setFirstTrack(true)
        getMyGPS(!currentGPS)
    };

    useEffect(() => {
        if (window.matchMedia) {
            var colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
            colorSchemeQuery.addEventListener("change", () =>
                setDark(getPreferredColorScheme())
            );
        }
    })

    useEffect(() => {
        if (_map)
            _map.setOptions(
                {
                    styles: !dark ? mapStylesDark : mapStyles,
                }
            );
    }, [_map, dark])

    useEffect(() => {
        if (!entries.length) return;
        const zoomExtends = () => {
            if (!window.google || !markers.length || !_map) return;
            const _bounds = new window.google.maps.LatLngBounds();
            markers.map((item, i) => {
                _bounds.extend(item.position);
                return true;
            });
            _map.fitBounds(_bounds);
            return;
        };
        let _tmpMarkers = [];
        let _tmpNavItems = []
        entries.map((item) => {
            var _mappedMarker = {
                position: getLanLng(item[2]),
                infoWindow: getInfoWindowContent(item, this),
            };
            var _mappedNavItem = {
                title: item[0],
            };
            _tmpMarkers.push(_mappedMarker);
            _tmpNavItems.push(_mappedNavItem);
            return null;
        });
        setMarkers(_tmpMarkers)
        setNavItems(_tmpNavItems)
        zoomExtends()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries])


    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: window.apiKey
    })

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(defaultMapCenter);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return (

        <>
            <SidebarComponent
                allowGPS={allowGPS}
                gpsLoading={gpsLoading}
                handleMenuOpen={handleMenuOpen}
                handleToggleOpen={handleToggleOpen}
                list={list}
                lists={lists}
                markerOpen={markerOpen}
                menuOpened={menuOpened}
                navItems={navItems}
                toggleMyGPS={toggleMyGPS} />
            <div className="content" style={{ height: "100vh", padding: 0 }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={styles.mapa}
                    options={{
                        styles: dark ? mapStylesDark : mapStyles,
                        center: defaultMapCenter,
                        zoom: 18,
                        mapTypeControl: false,
                        panControl: false,
                        streetViewControl: true,
                        scrollwheel: true,
                        zoomControl: true,
                        fullscreenControl: false,
                    }}
                    onClick={() => setMenuOpened(false)}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <>

                        {allowGPS && myGPS && (
                            <Marker
                                position={myGPS}
                                onClick={() => {
                                    panMap(myGPS);
                                    setMarkerOpen(null);
                                }}
                                icon={iconGPS}
                                key={"myGPS"}
                            />
                        )}

                        {markers.map((item, i) => {
                            return (
                                <Marker
                                    position={item.position}
                                    icon={
                                        markerOpen === i
                                            ? iconActive(dark)
                                            : icon
                                    }
                                    key={i}
                                    onClick={() => handleToggleOpen(i)}
                                />
                            );
                        })}
                        {markerOpen > -1 &&
                            markers[markerOpen] && (
                                <InfoWindow
                                    options={{
                                        pixelOffset: { width: 0, height: -23 },
                                        closeBoxMargin: 20,
                                        pane: "floatPane",
                                    }}
                                    position={
                                        markers[markerOpen].position
                                    }
                                    onCloseClick={() => handleToggleOpen(null)}
                                >
                                    <div
                                        className="infoBox"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                markers[markerOpen][
                                                "infoWindow"
                                                ]["content"],
                                        }}
                                    />
                                </InfoWindow>
                            )}</>
                </GoogleMap>}
            </div>
        </ >
    )

}