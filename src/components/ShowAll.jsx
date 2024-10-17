import { ReactComponent as Logo } from "../images/logo-zz2.svg"
import { Icon } from "./RelatedEntries"

export const ShowAll = ({ entries, list, globalTime }) => {
    if (!entries.length || !list) return
    return (
        <div className="page entries" style={{ padding: 10 }}>
            {entries.map((entry, i) =>
                <div className="entry" key={i}>
                    <h3>{entry.title}</h3>
                    <p><i><b>{entry.intro}</b></i></p>
                    <p dangerouslySetInnerHTML={{ __html: globalTime ? globalTime : entry.fulltext }} style={{ fontSize: "smaller" }}></p>
                    <span className="thumb">
                        <img
                            src={entry.galerie[0].small}
                            alt={entry.title}
                            className="thumb"
                        /><Icon number={i + 1} /></span>
                </div>
            )}

            <a className="entry" key='logo' style={{ justifyContent: 'flex-end' }} href={`/map/${list.slug}`}><Logo /></a>
        </div>
    )
}