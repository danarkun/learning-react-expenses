import React, { useState, useEffect, useContext } from 'react'
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { useLocation, useHistory } from "react-router-dom";
import { Router } from 'react-router-dom/cjs/react-router-dom.min';

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
        // If coming from clicking Transaction Viewer need to select a transaction from drop down
        if (location.search == '?list')
            return <TransactionDropDown />;
        else if (transaction == null) {
            return <p>Loading...</p>
        }
        else {
            return <TransactionItem />
        }
    }

    function SetSelectedTransaction(transaction) {
        let ret = transactions.find(t => t.id == transaction)
        history.push({
            pathname: "/TransactionViewer",
            search: `transaction`,
            state: { detail: ret }
        })
    }

    class TransactionDropDown extends React.Component {
        constructor() {
            super();
        }

        componentDidMount() {
            let wrapper = document.getElementById("wrapper");

            let dropDown = document.createElement('select');
            dropDown.value = transaction;

            let placeHolder = document.createElement('option');
            placeHolder.value = "";
            placeHolder.disabled = true;
            placeHolder.selected = true;
            placeHolder.appendChild(document.createTextNode("Select Transaction"));
            dropDown.appendChild(placeHolder);

            transactions.forEach(t => {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(`${t.text}`));
                option.value = `${t.id}`;
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
        }

        componentDidMount() {
            if (userList.find(x => x.id == transaction.user) === undefined) {
                purchaser = "deleted user";
            }
            else {
                var user = userList.find(x => x.id == transaction.user);
                purchaser = `${user.fname} ${user.lname}`;
                console.log(purchaser);
            }
        }

        render() {
            return (
                <div>
                    <h1>TRANSACTION VIEWER</h1>
                    <br />
                    <p><b>Transaction: </b>{transaction.text}</p>
                    <p><b>Transaction Amount: </b>{transaction.amount >= 0 ? "+" : "-"}${Math.abs(transaction.amount)}</p>
                    <p><b>Submitted by: </b>{
                    userList.find(x => x.id == transaction.user) == null ?
                    "deleted used" :
                    `${userList.find(x => x.id == transaction.user).fname} ${userList.find(x => x.id == transaction.user).lname}`}</p>
                    <p><b>Submitted at : </b>{transaction.timeStamp == undefined ? "Unknown time" : transaction.timeStamp.toString()}</p>

                    <button className="btn deleteButton" onClick={() => DeleteTransaction()}>DELETE TRANSACTION</button>
                </div>
            )
        }
    }

    return (
        <div>
            <GetComponentToDraw />
        </div>
    )
}

