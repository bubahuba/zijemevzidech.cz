import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SidebarComponent, mapStylesDark, mapStyles, getInfoWindowContent, getLanLng, defaultMapCenter, styles, iconGPS, iconActive, icon } from './mapAssets';
import { GoogleMap, InfoWindow, MapContext, Marker, useJsApiLoader } from '@react-google-maps/api';
import { siteBase } from './Layout';

export const Map = ({ entries, lists, list }) => {
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
    const [myGPS, setMyGPS] = useState(null)
    const [allowGPS, setAllowGPS] = useState(false)
    const [_map, setMap] = useState(null)
    const mapRef = useRef(null)
    const gpsWatchIdRef = useRef(null)
    const hasGpsFixRef = useRef(false)
    const shouldPanToGpsRef = useRef(false)
    const [streetViewPanorama, setStreetViewPanorama] = useState(null)
    const [streetViewVisible, setStreetViewVisible] = useState(false)

    const handleToggleOpen = (i, item) => {
        closeMenu();
        const isClosing = markerOpen === i;
        setMarkerOpen(isClosing ? null : i);
        if (!isClosing && i != null && markers[i]?.position) {
            mapRef.current?.panTo(markers[i].position);
        }
        setTimeout(() => window.refreshFsLightbox(), 400)
        var activeMenu = document.querySelector("nav li.active");
        if (item) window.gtag("event", "page_view", { page_title: item.title, page_location: siteBase + encodeURI(list) });
        return activeMenu !== null ? activeMenu.scrollIntoView() : "";
    };

    const handleMenuOpen = () => {
        setMenuOpened(!menuOpened);
        if (menuOpened) {
          document.body.classList.remove('blur')
        } else {
          document.body.classList.add('blur')
        }
    };

    const closeMenu = () => {
        document.body.classList.remove('blur')
        setMenuOpened(false);
    };

    const panToGps = (latlng) => {
        mapRef.current?.panTo(latlng);
    };

    const stopGpsWatch = useCallback(() => {
        if (gpsWatchIdRef.current != null) {
            navigator.geolocation.clearWatch(gpsWatchIdRef.current);
            gpsWatchIdRef.current = null;
        }
    }, []);

    const getMyGPS = useCallback((gpsAllow) => {
        if (!gpsAllow) {
            stopGpsWatch();
            setGpsLoading(false);
            setMyGPS(null);
            hasGpsFixRef.current = false;
            shouldPanToGpsRef.current = false;
            return;
        }

        stopGpsWatch();
        hasGpsFixRef.current = false;
        setGpsLoading(true);
        shouldPanToGpsRef.current = true;

        const GPSoptions = {
            enableHighAccuracy: false,
            timeout: 30000,
            maximumAge: 60000,
        };

        const onGpsPosition = (position) => {
            const thisPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            if (!Number.isFinite(thisPos.lat) || !Number.isFinite(thisPos.lng)) return;

            hasGpsFixRef.current = true;
            setGpsLoading(false);
            setMyGPS(thisPos);
            setMarkerOpen(null);
            closeMenu();
            if (shouldPanToGpsRef.current) {
                panToGps(thisPos);
                shouldPanToGpsRef.current = false;
            }
        };

        const onGpsError = (error) => {
            console.log("Error occurred. Error code: " + error.code);
            setGpsLoading(false);
            if (error.code === 1) {
                setAllowGPS(false);
                setMyGPS(null);
                hasGpsFixRef.current = false;
                stopGpsWatch();
            }
        };

        navigator.geolocation.getCurrentPosition(
            onGpsPosition,
            onGpsError,
            GPSoptions
        );

        gpsWatchIdRef.current = navigator.geolocation.watchPosition(
            onGpsPosition,
            (error) => {
                if (hasGpsFixRef.current) return;
                onGpsError(error);
            },
            GPSoptions
        );
    }, [stopGpsWatch]);

    const toggleMyGPS = (currentGPS) => {
        const next = !currentGPS;
        setAllowGPS(next);
        getMyGPS(next);
    };

    useEffect(() => {
        return () => stopGpsWatch();
    }, [stopGpsWatch]);

    useEffect(() => {
        if (window.matchMedia) {
            var colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
            colorSchemeQuery.addEventListener("change", () =>
                setDark(getPreferredColorScheme())
            );
        }
    })

    useEffect(() => {
        if (!entries?.length) {
            setNavItems([])
            return
        };
        
        let _tmpMarkers = [];
        let _tmpNavItems = []
        entries.map((item) => {
            var _mappedMarker = {
                position: getLanLng(item.gps),
                infoWindow: getInfoWindowContent(item, this),
            };
            var _mappedNavItem = {
                title: item.title,
            };
            _tmpMarkers.push(_mappedMarker);
            _tmpNavItems.push(_mappedNavItem);
            return null;
        });
        setMarkers(_tmpMarkers)
        setNavItems(_tmpNavItems)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [entries])

    useEffect(() => {
        if (!_map || !window.google) return;

        const panorama = _map.getStreetView();
        setStreetViewPanorama(panorama);
        setStreetViewVisible(panorama.getVisible());

        const listener = panorama.addListener('visible_changed', () => {
            setStreetViewVisible(panorama.getVisible());
        });

        return () => window.google.maps.event.removeListener(listener);
    }, [_map]);

useEffect(()=>{
    const zoomExtends = () => {
        if (!window.google || !markers?.length || !_map) return;
        const _bounds = new window.google.maps.LatLngBounds();
        markers.map((item, i) => {
            _bounds.extend(item.position);
            return true;
        });
        _map.fitBounds(_bounds);
        return;
    };
    zoomExtends()
    closeMenu()
},[_map, markers])

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: window.apiKey
    })

    const mapOptions = useMemo(() => ({
        styles: dark ? mapStylesDark : mapStyles,
        mapTypeControl: false,
        panControl: false,
        streetViewControl: true,
        scrollwheel: true,
        zoomControl: true,
        fullscreenControl: false,
    }), [dark]);

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(defaultMapCenter);
        map.fitBounds(bounds);

        mapRef.current = map;
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        stopGpsWatch();
        mapRef.current = null;
        setMap(null)
    }, [stopGpsWatch])

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
            <div className="content" style={{ height: "100vh", padding: 0, marginBottom: 0 }}>
                {isLoaded && <GoogleMap
                    mapContainerStyle={styles.mapa}
                    options={mapOptions}
                    onClick={() => setMenuOpened(false)}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <>

                        {allowGPS && myGPS && (
                            <Marker
                                position={myGPS}
                                onClick={() => {
                                    panToGps(myGPS);
                                    setMarkerOpen(null);
                                }}
                                icon={iconGPS}
                                zIndex={1000}
                                key="myGPS"
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
                            markers[markerOpen] && (() => {
                                const infoWindow = (
                                    <InfoWindow
                                        key={streetViewVisible ? 'streetview' : 'map'}
                                        options={{
                                            pixelOffset: { width: 0, height: -23 },
                                            closeBoxMargin: 20,
                                            disableAutoPan: true,
                                        }}
                                        position={markers[markerOpen].position}
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
                                );

                                return streetViewVisible && streetViewPanorama ? (
                                    <MapContext.Provider value={streetViewPanorama}>
                                        {infoWindow}
                                    </MapContext.Provider>
                                ) : infoWindow;
                            })()}</>
                </GoogleMap>}
            </div>
        </ >
    )

}
