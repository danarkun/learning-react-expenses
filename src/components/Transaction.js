import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


// Passing a transaction through as a prop to display (from TransactionList)
export const Transaction = ({ transaction }) => {
    // Get reference to deletetransaction function from global state
    const { deleteTransaction } = useContext(GlobalContext);
    const { userList } = useContext(GlobalContext);

    // Get the first name of the user object with ID that matches the user id for this transaction
    const { fname } = userList.find(x => x.id == transaction.user);

    return (
        <li className={transaction.amount > 0 ? "plus" : "minus"}>
            {transaction.text} {fname} <span>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}</span><button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
        </li>
    )
}