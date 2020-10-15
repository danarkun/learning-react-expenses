import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';

export const TransactionViewer = () => {
    const location = useLocation();
    const [transaction, setTransaction] = useState(location.state.detail);
    const { userList } = useContext(GlobalContext);
    const { deleteTransaction } = useContext(GlobalContext);

    const history = useHistory();
    var purchaser;

    if (userList.find(x => x.id == transaction.user) === undefined) {
        purchaser = "deleted used";
    }
    else {
        purchaser = userList.find(x => x.id == transaction.user).fname;
    }

    function DeleteTransaction() {
        deleteTransaction(transaction.id).then(() => {
            history.push("./ExpenseTracker");
        })
    }
    
    return (
        <div>
            <h1>TRANSACTION VIEWER</h1>
            <p>Transaction: {transaction.text}</p>
            <p>Transaction Amount: {transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}</p>
            <p>Transaction ID: {transaction.id}</p>
            <p>Transaction Name: {purchaser}</p>

            <button  onClick={() => DeleteTransaction()}>DELETE TRANSACTION</button>
        </div>
    )
}


    // useEffect(() => {
    //     // Get transaction that we've been passed from clicked Transaction component
    //     setTransaction(location.state.detail);

    //     return() => {
    //         console.log("CLEANING UP");
    //     }
    // }, [location])