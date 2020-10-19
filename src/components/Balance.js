import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
const { transactions } = useContext(GlobalContext);

const total = CalculateBalance(transactions);

return (
        <>
            <h4>Balance</h4>
            <h2 id="balance">${total}</h2>
        </>
    )
}

function CalculateBalance(transactions) {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    return total;
}
