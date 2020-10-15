import React, { useState, useContext } from 'react'
import { UserInSelect } from './UserInSelect'
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
    // Default user to first one if there are any
    const [user, setUser] = useState(SetDefaultUser());

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: generateID(),
            text,
            amount: +amount,
            user,
            timeStamp: new Date()
        }

        addTransaction(newTransaction).then(() => {
            ResetForm();
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
    
    // TODO when user is deleted, onChange() doesn't get called to set the currently selected transaction user,
    // thus uses the previously selected users ID (now undefined)

    return (
        <>
            <h3>Add new transaction</h3>
            <form name="transForm" id="transForm" onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." required />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />(negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." required/>
                </div>
                <div className="formcontrol">
                    <label htmlFor="user">Assign User</label><br />
                    <select id="user" name="user" value={user} onChange={e => setUser(e.target.value)} required>
                        {userList.map(user => (<UserInSelect key={user.id} user={user} isList={false} />))}
                    </select>
                </div>
                <input type="submit" id="subButton" className="btn" value={userList.length === 0 ? "Add Atleast One User" : "Add transaction"}></input>
            </form>
        </>
    )
}
