import React, { useState, useEffect, useContext } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { useLocation, useHistory } from "react-router-dom";

import { GlobalContext } from '../context/GlobalState';
// import { TransactionDropDown } from './ShadowDOMs/TransactionDropDown';

export const TransactionViewer = () => {
    const { userList } = useContext(GlobalContext);
    const { transactions } = useContext(GlobalContext);
    const { deleteTransaction } = useContext(GlobalContext);

    const location = useLocation();
    const [transaction, setTransaction] = useState(VerifyState());


    const history = useHistory();
    var purchaser;

    useEffect(() => {
        // TODO GET TRANSACTION FROM SEARCH
        // THAT WAY NAVLINK FROM HOME PASSES IN ?=link QUERY SO WE KNOW TO RENDER TRANSACTION LIST INSTEAD OF TRYING TO RENDER A TRANSACTION

        // If query == passedValue, use location.state.detail
        // else display list

        // Get transaction that we've been passed from clicked Transaction component
        setTransaction(VerifyState);

        return () => {
            // Cleanup code
        }
    }, [location])

    function DeleteTransaction() {
        deleteTransaction(transaction.id).then(() => {
            history.push("./Home");
        })
    }

    function VerifyState() {
        if (location.search == '?list') {
            return;
        }
        return location.state.detail;
    }

    function GetComponentToDraw() {
        var ret;
        if (location.search == '?list')
            return <TransactionDropDown />;
        else
            return <TransactionItem />
    }

    function SetSelectedTransaction(transaction) {
        setTransaction(transaction);
    }

    class TransactionDropDown extends React.Component {
        constructor() {
            super();
        }

        componentDidMount() {
            let wrapper = document.getElementById("wrapper");

            let dropDown = document.createElement('select');
            dropDown.value = transaction;

            transactions.forEach(t => {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(`${t.text}`));
                option.value = `${t.text}`;
                dropDown.appendChild(option);
            })

            dropDown.onchange = e => { SetSelectedTransaction(e.target.value) };
            wrapper.appendChild(dropDown);
        }

        render() {
            return (
                <div id="wrapper" />
            )
        }
    }

    class TransactionItem extends React.Component {
        constructor() {
            super();

            if (userList.find(x => x.id == transaction.user) === undefined) {
                purchaser = "deleted user";
            }
            else {
                var user = userList.find(x => x.id == transaction.user);
                purchaser = `${user.fname} ${user.lname}`;
            }
        }

        render() {
            return (
                <div>
                    <h1>TRANSACTION VIEWER</h1>
                    <br />
                    <p><b>Transaction: </b>{transaction.text}</p>
                    <p><b>Transaction Amount: </b>{transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}</p>
                    <p><b>Submitted by: </b>{purchaser}</p>
                    <p><b>Submitted at : </b>{transaction.timeStamp == undefined ? "Unknown time" : transaction.timeStamp.toString()}</p>

                    <button className="btn deleteButton" onClick={() => DeleteTransaction()}>DELETE TRANSACTION</button>
                </div>
            )
        }
    }

    return (
        <div id="topDiv">
            <GetComponentToDraw />
        </div>
    )
}

