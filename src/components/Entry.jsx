import React from "react";
import { Gallery, Item } from 'react-photoswipe-gallery';
import { FileIcon } from "./FileIcon";
import { ContactForm } from "./ContactForm";
import { Link, useParams } from "react-router-dom";
import { siteBase, titleBase } from "./Layout";
import { Helmet } from 'react-helmet';
import { RelatedEntries } from "./RelatedEntries";



export const Entry = ({ data }) => {
    const { category, entry } = useParams()
    if (!data[0]) return null;
    const { title, intro, galerie, fulltext, files, date, related, slug, mapa, global_time } = data[0];
    const needGallery = (galerie.length > 1);
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
            <Helmet>
                <title>{title.replace('&amp;','&')}{titleBase}</title>
                {intro && <meta name="description" content={intro} />}
                {galerie[0] && galerie.map((item, i) =>
                    <meta property="og:image" key={i} content={item.large} />)}
            </Helmet >
            <h1><span dangerouslySetInnerHTML={{ __html: title }}></span> <span className="date">{itemDate}</span></h1>
            <p dangerouslySetInnerHTML={{ __html: intro }}></p>
            <div dangerouslySetInnerHTML={{ __html: fulltext }}></div>
            {
                files && <div className="files">{files.map((item, i) => {
                    const file_name = item.file.split('/').pop();
                    const extension = file_name.split('.').pop();
                    const fileName = file_name.split('.').shift();

                    return (<a
                        href={`${item.file}?${new Date().getTime()}`}
                        download={`${fileName}.${extension}`}
                        className={'file ' + extension}
                        key={i}
                    ><FileIcon></FileIcon><span className="fileName"><span className={fileName.length > 10 ? 'overflow' : undefined}>{fileName}</span>.{extension}</span>
                    </a>)
                })}</div>
            }
            {galerie[0] && !mapa && <img src={galerie[0].large} alt={galerie[0].title} style={{ width: '100%' }} className="poster" tabIndex="0" />}
            {galerie[0] && mapa && <Link to={mapa} title="Zobrazit mapu"><img src={galerie[0].large} alt={galerie[0].title} style={{ width: '100%' }} className="poster" tabIndex="0" /></Link>}
            {
                needGallery && <Gallery withCaption><div className="galerie">{galerie.slice(1, galerie.length).map((item, i) => <Item
                    original={item.large}
                    thumbnail={item.small}
                    caption={item.title}
                    width={item.width}
                    height={item.height}
                    key={i}
                >
                    {({ ref, open }) => (
                        <img ref={ref} onClick={open} src={item.small} alt={item.title} />

                    )}
                </Item>)}</div></Gallery>
            }
            {related && <RelatedEntries entries={related} link={`/map/${slug}`} globalTime={global_time} />}
            <ContactForm />
        </>
    )
}