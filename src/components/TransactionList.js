import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import { Transaction } from './Transaction';
import { DataGrid } from '@material-ui/data-grid';

export const TransactionList = () => {
    // Get global context to have access to it's states
    // Using destructuring to pull out transactions list
    const { transactions } = useContext(GlobalContext);
    const history = useHistory();

    function OnTransactionClick(transaction) {
        history.push({
            pathname: "/TransactionViewer",
            search: `transaction`,
            state: { detail: transaction }
        })
    }

    return (
        <>
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    columns={[
                        { field: 'text', headerName: 'Transaction', width: 175, resizable: true },
                        { field: 'amount', headerName: 'Amount', type: 'number' },
                        { field: 'userName', headerName: 'Submitted By', width: 200 }
                    ]}
                    rows={transactions}
                    onCellClick={t => OnTransactionClick(t.data)}
                />
            </div>

        </>
    )
}
