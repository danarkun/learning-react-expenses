import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from "react-router-dom";
import { Transaction } from './Transaction';
import { DataGrid } from '@material-ui/data-grid';

export const TransactionList = () => {
    // Get global context to have access to it's states
    // Using destructuring to pull out transactions list
    const { transactions } = useContext(GlobalContext);
    const { userList } = useContext(GlobalContext);
    const history = useHistory();

    function OnTransactionClick(transaction) {
        history.push({
            pathname: "/TransactionViewer",
            search: `transaction`,
            state: { detail: transaction }
        })
    }

    // Get user first and last name from userID
    function GetUser(userID) {
        const user = userList.find(u => u.id == userID);
        return user == undefined ? 'deleted user' : `${user.fname} ${user.lname}`
    }

    // Parse transactions time stamp to an easily readable date
    function GetDate(date) {
        const dateString = new Date(date);
        return `${dateString.toLocaleDateString()} ${dateString.toLocaleTimeString()}`
    }

    return (
        <>
            <div style={{ height: 500, width: 600 }}>
                <DataGrid
                    columns={[
                        { field: 'text', headerName: 'Transaction', width: 175, renderCell: (params) => (<strong>{params.value}</strong>)},
                        { field: 'amount', headerName: 'Amount', type: 'number' },
                        { field: 'user', headerName: 'Submitted By', width: 130, valueFormatter: ( { value }) => GetUser(value)},
                        { field: 'timeStamp', headerName: 'Submitted At', width: 200, type: 'date', valueFormatter: ( { value }) => GetDate(value)}
                    ]}
                    rows={transactions}
                    onCellClick={t => OnTransactionClick(t.data)}
                />
            </div>

        </>
    )
}
