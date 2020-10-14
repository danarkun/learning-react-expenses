import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


// Passing a transaction through as a prop to display (from TransactionList)
export const Transaction = ({ transaction }) => {
    // Get reference to deletetransaction function from global state
    const { deleteTransaction } = useContext(GlobalContext);
    const { userList } = useContext(GlobalContext);

    var purchaser;
    // Get the first name of the user object with ID that matches the user id for this transaction
    if (userList.find(x => x.id === transaction.user) === undefined)
    {
        purchaser = "Deleted User";
    }
    else
    {
        purchaser = userList.find(x => x.id === transaction.user).fname;
    }

    return (
        <li className={transaction.amount > 0 ? "plus" : "minus"}>
            {transaction.text} ({purchaser}) <span>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}</span><button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
        </li>
    )
}