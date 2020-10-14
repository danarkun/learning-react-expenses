import React from 'react';

export const UserInSelect = ( {user, isList} ) => {
    return (
        <option value={user.id}>{user.fname} {user.lname}</option>
    )
}
