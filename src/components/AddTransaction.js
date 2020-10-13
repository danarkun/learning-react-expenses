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
    const [amount, setAmount] = useState(0);
    // Default user to first one if there are any
    const [user, setUser] = useState(userList[0]);
    // const [user, setUser] = useState(() => { 
    //     const { id } = userList[0];
    //     return id
    // });

    const onSubmit = e => {
        e.preventDefault();

        const newTransaction = {
            id: generateID(),
            text,
            amount: +amount,
            user
        }

        console.log(newTransaction);
        addTransaction(newTransaction);
    }

    function generateID() {
        return Math.floor(Math.random() * 1000000)
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text">Text</label>
                    <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    >Amount <br />(negative - expense, positive - income)</label>
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." />
                </div>
                <div className="formcontrol">
                    <label htmlFor="user">Assign User</label><br />
                    <select id="user" name="user" value={user.id} onChange={e => {console.log(e.target.value); setUser(e.target.value)}}>
                        {userList.map(user => (<User key={user.id} user={user} />))}
                    </select>
                </div>
                <button className="btn">Add transaction</button>
            </form>
        </>
    )
}
