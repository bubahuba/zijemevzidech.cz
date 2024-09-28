import React from "react";
import { Link, useParams } from "react-router-dom";

export const Category = ({ data }) => {
    const { category } = useParams()
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    return (
        <div className="category">{data.map((entry, i) => {
            const { title, intro, galerie, slug, date } = entry;
            const itemDate = new Date(Number(date)*1000).toLocaleDateString("cs-CZ", dateOptions)
            return (
                <Link key={i} className="item" to={'/' + category + '/' + slug}>
                    <img src={galerie[0].small} alt={galerie[0].title} />
                    <h1>{title} <span className="date">{itemDate}</span></h1>
                    <p>{intro}</p>
                </Link>
            )
        })}
        </div>
    )
}