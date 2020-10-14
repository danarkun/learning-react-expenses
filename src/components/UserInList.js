import React, { useContext } from 'react';
import { GlobalContext, GlobalState } from '../context/GlobalState';

export const UserInList = ( {user, isList} ) => {
    const { deleteUser } = useContext( GlobalContext );
    return (
        <li value={user.id}>
            {user.fname} {user.lname}<button className="delete-btn" onClick={() => deleteUser(user.id)}>x</button>
        </li>
    )
}