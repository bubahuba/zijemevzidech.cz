import React from "react";
import { Gallery, Item } from 'react-photoswipe-gallery';
import { FileIcon } from "./FileIcon";
import { ContactForm } from "./ContactForm";
import { useParams } from "react-router-dom";
import { siteBase } from "./Layout";



export const Entry = ({ data }) => {
    const { category, entry } = useParams()
    if (!data[0]) return null;
    const { title, intro, galerie, fulltext, files, date } = data[0];
    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    };
    const itemDate = new Date(Number(date) * 1000).toLocaleDateString("cs-CZ", dateOptions)

    if (window.gtag) window.gtag("event", "page_view", { page_title: title, page_location: siteBase + (category ? category + '/' + entry : '') });

    return (
        <>
            <h1>{title} <span className="date">{itemDate}</span></h1>
            <p>{intro}</p>
            <div dangerouslySetInnerHTML={{ __html: fulltext }}></div>
            {files && <div className="files">{files.map((item, i) => {
                const file_name = item.file.split('/').pop();
                const extension = file_name.split('.').pop();
                const fileName = file_name.split('.').shift();

                return (<a
                    href={item.file}
                    className={'file ' + extension}
                    key={i}
                ><FileIcon></FileIcon><span className="fileName"><span className="overflow">{fileName}</span>.{extension}</span>
                </a>)
            })}</div>}
            {galerie.length && <Gallery withCaption><div className="galerie">{galerie.map((item, i) => <Item
                original={item.large}
                thumbnail={item.small}
                caption={item.title}
                width={item.width}
                height={item.height}
                key={i}
            >
                {({ ref, open }) => (
                    <img ref={ref} onClick={open} width={300} height={300} src={item.small} alt={item.title} />

                )}
            </Item>)}</div></Gallery>}
            <ContactForm />
        </>
    )
}