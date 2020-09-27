import React from 'react'

// Passing a transaction through as a prop to display (from TransactionList)
export const Transaction = ({ transaction }) => {
    return (
        <li className={transaction.amount > 0 ? "plus" : "minus"}>
            {transaction.text} <span>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}</span><button className="delete-btn">x</button>
        </li>
    )
}