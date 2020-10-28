import React from 'react';
import { useHistory } from "react-router-dom";
import { MenuItem } from '@material-ui/core';
import { NodeMailer } from 'nodemailer';

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
            {user.fname} {user.lname} <span>{user.email}</span>
        </li>
    )
}

const UserInSelect = ({ user }) => {
    return (
        <MenuItem value={user.id}>{user.fname} {user.lname}</MenuItem>
    )
}
