import React from "react";
import { Sidebar } from "./Sidebar";
import { useParams } from "react-router-dom";
import { Entry } from "./Entry";
import { Category } from "./Category";
import { NotFound } from "./NotFound";
import { SunspotLoader } from "../node_modules/react-awesome-loaders";
import { useQuery } from "@tanstack/react-query";

export const apiBase = 'https://zijemevzidech.cz/api/json/';
export const eeBase = 'https://zijemevzidech.cz/api/index.php';
export const siteBase = 'https://zijemevzidech.cz/';
export const titleBase = ' ✡︎ Žijeme v Židech'


export const Layout = () => {
    const { category, entry } = useParams()

    const cat = category ? category : 'aktivity';

    const { data: navItems } = useQuery({
        queryKey: ['menu'],
        queryFn: () =>
            fetch(apiBase + 'menu').then((res) =>
                res.json(),
            ),
    })

    const { isPending, isError, data } = useQuery({
        queryKey: [`entries-${cat}-${entry? entry: 'index'}`],
        queryFn: () =>
            fetch(entry ? apiBase + 'entry/' + entry : apiBase + 'entries/c/' + cat).then((res) =>
                res.json(),
            ),
    })



    if (isError) return (
        <div className="App">
            {console.error(isError.message)}
            <Sidebar navItems={navItems} />
            <NotFound />
        </div>
    )

    return (
        <div className="App">
            <Sidebar navItems={navItems} currentItem={category ? category : 'aktivity'} />

            <div className="main content">{(isPending || !data) ? <SunspotLoader
                gradientColors={["#00a4d5", "transparent"]}
                style={{ width: "100%" }}
                shadowColor={"#3730A3"}
                desktopSize={"228px"}
                mobileSize={"100px"}
            /> : (data && data.length > 0 && !isPending) && (entry || data.length === 1) ? <Entry data={data} /> : <Category data={data} />}</div>
        </div>
    )
}