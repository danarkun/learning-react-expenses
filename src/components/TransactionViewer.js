import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';

export const TransactionViewer = () => {
    const location = useLocation();
    const [transaction, setTransaction] = useState(VerifyState());
    const { userList } = useContext(GlobalContext);
    const { deleteTransaction } = useContext(GlobalContext);

    const history = useHistory();
    var purchaser;

    useEffect(() => {
        // Get transaction that we've been passed from clicked Transaction component
        setTransaction(VerifyState);
    
        return() => {
            // Cleanup code
        }
    }, [location])

    if (userList.find(x => x.id == transaction.user) === undefined) {
        purchaser = "deleted user";
    }
    else {
        var user = userList.find(x => x.id == transaction.user);
        purchaser = `${user.fname} ${user.lname}`;
    }

    function DeleteTransaction() {
        deleteTransaction(transaction.id).then(() => {
            history.push("./Home");
        })
    }

    function VerifyState() {
        if (location.state != null && location.state.detail != null)
        {
            return location.state.detail;
        }
        
        return "trans";
    }
    
    return (
        <div>
            <h1>TRANSACTION VIEWER</h1>
            <br />
            <p><b>Transaction: </b>{transaction.text}</p>
            <p><b>Transaction Amount: </b>{transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}</p>
            <p><b>Submitted by: </b>{purchaser}</p>
            <p><b>Submitted at : </b>{transaction.timeStamp == undefined ? "Unknown time" : transaction.timeStamp.toString()}</p>

            <button className="btn deleteButton" onClick={() => DeleteTransaction()}>DELETE TRANSACTION</button>
        </div>
    )
}

