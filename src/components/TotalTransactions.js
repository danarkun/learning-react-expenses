import React, { useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TotalTransactions = () => {
    const { totalTransactions } = useContext(GlobalContext);

    return (
        <>
            <h5>Total Transactions</h5>
            <h6>{totalTransactions}</h6>
        </>
    )
}
