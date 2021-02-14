import React from 'react';
import "./ContentBlock.scss"

const ContentBlock = props => {
    const { title, description, details, appName, groupTitle } = props.data;
    const { images } = details;

    const includeInLinkTagIfURL = () => 
    details.url ? (<a href={details.url} target={details.openInNewTab ? "_blank" : "_self"} >{title}</a>)
    : (<span>{title}</span>);

    return (
        <div className={"ContentBlock" + (props.isFocused ? " focused" : "")}>
            <div className="imageContainer">
                <img src={"http://" + images.desktop} alt={`${appName} ${groupTitle} ${title}`} />
                <img className="mobile" src={"http://" + images.mobile} alt={`${appName} ${groupTitle} ${title}`} />
            </div>
            <div className="title">{includeInLinkTagIfURL()}</div>
            <div className="description" onClick={props.setAsFocused}>{description}</div>
            <div className="gradientBackground" />
        </div>
    );
}

export default ContentBlock;