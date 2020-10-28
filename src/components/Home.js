import React from 'react';
import { Header } from './Header';
import { Balance } from './Balance';
import { IncomeExpenses } from './IncomeExpenses';
import { TransactionList } from './TransactionList';
import { AddTransaction } from './AddTransaction';
import { TotalTransactions } from './TotalTransactions';
import { UserList } from './UserList';

export const Home = () => {
    return (
        <div>
            <div className="container">
            <Header />
            <UserList />
            <Balance />
            <IncomeExpenses />
            <TotalTransactions />
            <TransactionList />
            </div>
        </div>
    )
}
