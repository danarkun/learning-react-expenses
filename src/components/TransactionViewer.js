import React, { useState, useEffect, useContext } from 'react'
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
        if (location.search == '?transaction') {
            return location.state.detail;
        }
        return;
    }

    function GetComponentToDraw() {
        // If coming from clicking Transaction Viewer, need to select a transaction from drop down
        if (location.search == '?transaction') {
            if (transaction == null)
                return <p>Loading...</p>
            else
                return <TransactionItem />;
        }
        else {
            return <TransactionDropDown />
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

        render() {
            return (
                <div>
                    <h1>{this.props.propName}</h1>
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
            <h1>TRANSACTION VIEWER</h1>
            <br />
            <GetComponentToDraw />
        </div>
    )
}

