import React from 'react'

export const User = ( {user} ) => {
    return (
        <option value={user.id}>{user.fname} {user.lname}</option>
    )
}
