import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
// Get global context to have access to it's states
// Using destructuring to pull out transactions list
const { transactions } = useContext(GlobalContext);

console.log(transactions.forEach((x) => console.log(x)));

    return (
        <>
            <h3>History</h3>
            <ul id="list" className="list">
                {transactions.map(transaction => (<Transaction key={transaction.id} transaction={transaction} />))}
            </ul>
        </>
    )
}
