import React from 'react'

export const User = ( {user, isList} ) => {
    return (
        <option value={user.id}>{user.fname} {user.lname}</option>
    )
}
