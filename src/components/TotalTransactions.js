import React, { useContext} from 'react';
import { GlobalContext } from '../context/GlobalState';

export const TotalTransactions = () => {
    const { totalTransactions } = useContext(GlobalContext);

    return (
        <div className="totalTrans">
            <h5>Total Transactions</h5>
            <h6>{totalTransactions}</h6>
        </div>
    )
}
