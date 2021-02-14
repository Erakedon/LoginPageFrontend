import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { getUserContent } from "../../services/content";
import ContentBlock from "./ContentBlock/ContentBlock";
import "./UserDataPage.scss";

const UserDataPage = props => {
    const [appName, setAppName] = useState("");
    const [contentGroups, setContentGroups] = useState([]);
    const [focusedContentBlockId, setFocusedContentBlockId] = useState(0);

    const {userLoginKey} = useContext(UserContext);

    useEffect(() => {
        const getUserDataFromServer = async () => {
            try {
                const userContent = await getUserContent(userLoginKey);
                setAppName(userContent.appName);
                setContentGroups(userContent.groups);
            } catch (err) {
                props.history.push("/login");
            }
        }
        getUserDataFromServer();
    }, []);

    const renderContentGroup = groupData => (
        <div className="contentGroup" key={groupData.id}>
            <div className="title">{groupData.title}</div>
            <div className="contentBlocksContainer">
                {groupData.elements.map(block => (
                    <div key={block.id} >
                        <ContentBlock
                            data={{ ...block, appName, groupTitle: groupData.title }}
                            setAsFocused={() => { setFocusedContentBlockId(block.id) }}
                            isFocused={focusedContentBlockId === block.id} />
                    </div>))}
            </div>
        </div>
    );

    return (
        <div className="UserDataPage">
            <div className="header">
                <h1>{appName}</h1>
            </div>
            <div className="contentGroupsContainer">
                {contentGroups.map(groupData => renderContentGroup(groupData))}
            </div>
        </div>
    );
}

export default UserDataPage;
