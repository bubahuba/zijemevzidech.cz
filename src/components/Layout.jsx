import React, { useEffect, useState } from "react";
import { Sidebar } from "./Sidebar";
import { useParams } from "react-router-dom";
import { Entry } from "./Entry";
import { Category } from "./Category";
import { defaultColor } from "./mapAssets";
import { NotFound } from "./NotFound";
import { SunspotLoader } from "react-awesome-loaders";

export const apiBase = 'https://zijemevzidech.cz/api/json/';
export const eeBase = 'https://zijemevzidech.cz/api/index.php';
export const siteBase = 'https://zijemevzidech.cz/';

export const Layout = () => {
    const { category, entry } = useParams()
    const [navItems, setNavItems] = useState([])
    const [data, setData] = useState([])
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const url = apiBase + 'menu';
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setNavItems(json);
            } catch (error) {
                console.error(error.message);
                setNotFound(true)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setData([])
        setNotFound(false)
        const fetchData = async () => {
            const cat = category ? category : 'about';
            const url = entry ? apiBase + 'entry/' + entry : apiBase + 'entries/c/' + cat;
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`);
                }

                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error(error.message);
                setNotFound(true)
            }
        }
        fetchData()

    }, [category, entry])

    if (notFound) return (
        <div className="App" style={{ backgroundColor: defaultColor }}>
            <Sidebar navItems={navItems} currentItem={category ? category : 'about'} />
            <NotFound />
        </div>
    )

    return (
        <div className="App" style={{ backgroundColor: defaultColor }}>
            <Sidebar navItems={navItems} currentItem={category ? category : 'about'} />

            <div className="main content" style={{ height: 'auto' }}>{!data.length && <SunspotLoader
                gradientColors={["#00a4d5", "transparent"]}
                style={{width: "100%"}}
                 shadowColor={"#3730A3"}
                desktopSize={"228px"}
                mobileSize={"100px"}
            />}{data.length > 0 && (entry || data.length === 1) ? <Entry data={data} /> : <Category data={data} />}</div>
        </div>
    )
}