import React, { useState, useContext } from 'react'
import { User } from './User'
import { GlobalContext } from '../context/GlobalState';

export const AddTransaction = () => {
    // Create piece of state (text) and function to manipulate that state (setText)
    // See below, our text input field = to our component level text state (line below), onChanging this input field we update
    // the text state to the inputed value (e.target.value)
    // Same with amount
    const { addTransaction } = useContext(GlobalContext);
    const { userList } = useContext(GlobalContext);

    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedUser, setSelected] = useState(false);
    // Default to "select user" option
    const [user, setUser] = useState("default");

    const onSubmit = e => {
        e.preventDefault();
        if (!selectedUser)
        {
            alert("Select a user");
            return;
        }

        const newTransaction = {
            id: generateID(),
            text,
            amount: +amount,
            user,
            timeStamp: new Date()
        }

        addTransaction(newTransaction)
        .then(() => {
            ResetForm();
        })
        .catch((err) => {
            console.error(`AddTransaction promise error: ${err}`);
        })
    }

    function SetDefaultUser() {
        if (userList.length === 0) {
            return "";
        }
        else {
            const { id } = userList[0];
            return id;
        }
    }

    function ResetForm() {
        setText('');
        setAmount('');
    }

    function generateID() {
        return Math.floor(Math.random() * 1000000)
    }

    function SelectUser(user)
    {
        setUser(user);
        setSelected(true);
    }

    // TODO when user is deleted, onChange() doesn't get called to set the currently selected transaction user,
    // thus uses the previously selected users ID (now undefined)

    return (
        <>
            <h3>Add new transaction</h3>
            <form name="transForm" id="transForm" onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text"><b>Text</b></label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." required />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    ><b>Amount</b> <br />(Negative: expense, Positive: income)</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." required />
                </div>
                <div className="formcontrol">
                    <label htmlFor="user">Assign User</label><br />
                    <select id="user" name="user" value={user} onChange={e => SelectUser(e.target.value)} required>
                        <option value="default" disabled>{`${userList.length === 0 ? "No Users" : "Select User"}`}</option>
                        {userList.map(user => (<User key={user.id} user={user} isList={false} />))}
                    </select>
                </div>
                <input type="submit" id="subButton" className={`${userList.length === 0 ? "blocked" : ""} btn`} value={userList.length === 0 ? "Add Atleast One User" : "Add transaction"}></input>
            </form>
        </>
    )
}
