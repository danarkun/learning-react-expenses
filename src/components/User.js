import React from 'react'

export const User = ( {user} ) => {
    // Get reference to deletetransaction function from global state
    // const { deleteUser } = useContext(GlobalContext);
    return (
        <li>
            {user.fname} {user.lname} ({user.country})
        </li>
    )
}
