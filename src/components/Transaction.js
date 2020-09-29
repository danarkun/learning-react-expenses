import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';


// Passing a transaction through as a prop to display (from TransactionList)
export const Transaction = ({ transaction }) => {
    // Get reference to deletetransaction function from global state
    const { deleteTransaction } = useContext(GlobalContext);
    return (
        <li className={transaction.amount > 0 ? "plus" : "minus"}>
            {transaction.text} <span>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}</span><button className="delete-btn" onClick={() => deleteTransaction(transaction.id)}>x</button>
        </li>
    )
}