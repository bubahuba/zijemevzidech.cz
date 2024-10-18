import { Link } from "react-router-dom"
import { ReactComponent as Logo } from "../images/logo-zz2.svg"
import { ReactComponent as MarkerIcon } from "../images/markerIcon.svg"
import { defaultColor } from "./mapAssets"

export const Icon = ({ number }) => {
    return (
        <div className="markerIcon">
            <span>{number}</span>
            <MarkerIcon color={defaultColor} />
        </div>
    )
}

export const RelatedEntries = ({ entries, link, globalTime }) => {
    setTimeout(() => window.refreshFsLightbox(), 400)

    return (
        <>
        <h2 style={{fontWeight: 300}}><b>O</b>tevřené <b>Dvo</b>rky a <b>Do</b>my</h2>
        <div className="page entries" style={{ marginTop: 20 }}>
            {entries.map((entry, i) =>
                <div className="entry" key={i}>
                    <h3>{entry.title}</h3>
                    <p><i><b>{entry.intro}</b></i></p>
                    <p dangerouslySetInnerHTML={{ __html: globalTime ? globalTime : entry.fulltext }} style={{ fontSize: "smaller" }}></p>
                    {entry.galerie[0] && <a
                        href={entry.galerie[0].large}
                        data-fslightbox={link}
                        className="thumb"
                    ><img src={entry.galerie[0].small} alt={entry.galerie[0].title} height={300} /><Icon number={i + 1} /></a>}
                </div>
            )}

            <Link className="entry" key='logo' style={{ justifyContent: "flex-end" }} to={link}><Logo /></Link>
        </div>
        </>
    )
}