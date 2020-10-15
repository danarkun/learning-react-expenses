import React from 'react';
import { useHistory } from 'react-router-dom';

export const UserInList = ( {user, isList} ) => {
    const history = useHistory();

    return (
        <li value={user.id} className="clickableList" onClick={() => history.push({
            pathname: "/UserViewer",
            search: `?=${user.id}`,
            state: { detail: user}
        }
        )}>
            {user.fname} {user.lname}
        </li>
    )
}