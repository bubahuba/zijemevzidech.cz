import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { siteBase, titleBase } from "./Layout";
import { Helmet } from "react-helmet-async";
import { ReactComponent as Logo } from "../images/logo-zz2.svg"

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
                {category && <title>{state ? state.title.replace('&amp;','&') : ''}{titleBase}</title>}
                <meta property="og:image" content="/images/og-image.png" />
            </Helmet>
            <div className="category">{data.map((entry, i) => {
                const { title, intro, galerie, slug, date, category: cat } = entry;
                const itemDate = new Date(Number(date) * 1000).toLocaleDateString("cs-CZ", dateOptions)
                return (
                    <Link key={i} className="item" to={'/' + (category ? category : cat) + '/' + slug}>
                        <h1><span dangerouslySetInnerHTML={{ __html: title }}></span> <span className="date">{itemDate}</span></h1>
                        <p dangerouslySetInnerHTML={{ __html: intro }}></p>
                        {galerie[0] ? <img src={galerie[0].small} alt={galerie[0].title} /> : <Logo style={{ width: '100%' }} />}
                    </Link>
                )
            })}
            </div>
        </>
    )
}