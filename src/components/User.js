import React from 'react'
import { useHistory } from "react-router-dom";

export const User = ({ user, isList }) => {
    function ResolveComponentType() {
        return isList ? <UserInList user={user} /> : <UserInSelect user={user} />
    }
    return (
        <ResolveComponentType />
    )
}

const UserInList = ({ user }) => {
    const history = useHistory();

    return (
        <li value={user.id} className="clickableList" onClick={() => history.push({
            pathname: "/UserViewer",
            search: `${user.id}`,
            state: { detail: user }
        }
        )}>
            {user.fname} {user.lname}
        </li>
    )
}

const UserInSelect = ({ user }) => {
    return (
        <option value={user.id}>{user.fname} {user.lname}</option>
    )
}
