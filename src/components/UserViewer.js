import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';

export const UserViewer = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state.detail);
    const { deleteUser } = useContext(GlobalContext);

    const history = useHistory();
    var purchaser;

    useEffect(() => {
        // Get user that we've been passed from clicked User component
        setUser(location.state.detail);

        return () => {
            // Cleanup code
        }
    }, [location])

    function DeleteUser() {
        deleteUser(user.id).then(() => {
            history.push("./ExpenseTracker");
        })
    }

    return (
        <div>
            <h1>USER VIEWER</h1>
            <br />

            <p>User Name: {user.fname} {user.lname}</p>
            <p> User added at: {user.timeStamp == undefined ? "Unknown time" : user.timeStamp.toString()}</p>
            <button className="btn deleteButton" onClick={() => DeleteUser()}>DELETE USER</button>
        </div>
    )
}

