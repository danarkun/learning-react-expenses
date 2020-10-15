import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { useHistory } from 'react-router-dom';

// Passing a transaction through as a prop to display (from TransactionList)
export const Transaction = ({ transaction }) => {
    // Get reference to deletetransaction function from global state
    const { deleteTransaction } = useContext(GlobalContext);
    const { userList } = useContext(GlobalContext);

    const history = useHistory();

    var purchaser;

    // Get the first name of the user object with ID that matches the user id for this transaction

    // If they've been deleted and we've lost reference to them
    if (userList.find(x => x.id == transaction.user) === undefined) {
        purchaser = "deleted used";
    }
    else {
        purchaser = userList.find(x => x.id == transaction.user).fname;
    }

    // On clicking this element, route page to TransactionViewer and pass it this transaction
    return (
        <li className={transaction.amount > 0 ? "plus" : "minus"} id="transList" onClick={() => history.push({
            pathname: "/TransactionViewer",
            search: `?=${transaction.id}`,
            state: { detail: transaction}
        }
        )}>
            {transaction.text} ({purchaser}) <span>{transaction.amount > 0 ? "+" : "-"}${Math.abs(transaction.amount)}</span>
        </li>
    )
}