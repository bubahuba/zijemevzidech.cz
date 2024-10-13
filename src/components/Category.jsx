import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { siteBase, titleBase } from "./Layout";
import { Helmet } from "react-helmet";

export const Category = ({ data }) => {
    const { category } = useParams()
    const { state } = useLocation()
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    if (window.gtag) window.gtag("event", "page_view", { page_title: category, page_location: siteBase + (category ? category + '/' : '') });

    return (
        <>
            <Helmet>
                {category && <title>{state ? state.title : ''}{titleBase}</title>}
                <meta property="og:image" content="/images/og-image.png" />
            </Helmet>
            <div className="category">{data.map((entry, i) => {
                const { title, intro, galerie, slug, date } = entry;
                const itemDate = new Date(Number(date) * 1000).toLocaleDateString("cs-CZ", dateOptions)
                return (
                    <Link key={i} className="item" to={'/' + category + '/' + slug}>
                        <img src={galerie[0].small} alt={galerie[0].title} />
                        <h1>{title} <span className="date">{itemDate}</span></h1>
                        <p>{intro}</p>
                    </Link>
                )
            })}
            </div>
        </>
    )
}