import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';

export const UserViewer = () => {
    const location = useLocation();
    const [user, setUser] = useState(location.state.detail);
    const { deleteUser } = useContext(GlobalContext);
    const { transactions } = useContext(GlobalContext);

    const history = useHistory();

    useEffect(() => {
        // Get user that we've been passed from clicked User component
        setUser(location.state.detail);

        return () => {
            // Cleanup code
        }
    }, [location])

    function DeleteUser() {
        deleteUser(user.id).then(() => {
            history.push("./Home");
        })
    }

    function UserExpenses() {
        var sum = 0;
        if (transactions == undefined) {
            return 0;
        }

        transactions.map(t => {
            if (t.user == user.id) {
                sum += t.amount;
            }
        })
        return sum;
    }

    return (
        <div>
            <h1>USER VIEWER</h1>
            <br />

            <p><b>User Name: </b>{user.fname} {user.lname}</p>
            <p><b>User Email: </b>{user.email}</p>
            <p><b>User added at: </b>{user.timeStamp == undefined ? "Unknown time" : user.timeStamp.toString()}</p>
            <p><b>User expenditure: </b>${UserExpenses()}</p>
            <button className="btn deleteButton" onClick={() => DeleteUser()}>DELETE USER</button>
        </div>
    )
}

