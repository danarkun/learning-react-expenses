import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GlobalContext } from '../context/GlobalState';

// export const AddUser = ( {history} ) => {
export const AddUser = () => {

    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [country, setCountry] = useState('Australia');
    const { addUser } = useContext(GlobalContext);
    const history = useHistory();

    const onSubmit = e => {
        e.preventDefault();
    
        const newUser = {
            id: generateID(),
            lname,
            fname,
            country,
            timeStamp: new Date()
        }

        addUser(newUser).then(() => {
            history.push("/ExpenseTracker");
        })
    }
    
    function generateID() {
        return Math.floor(Math.random() * 1000000)
    }

    return (
        <div>
            <h1>ADD USER</h1>
            <br />
            <form onSubmit={onSubmit}>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" className="textInput" name="firstname" placeholder="Your name.." value={fname} onChange= {e => setFname(e.target.value)} required></input>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" className="textInput" name="lastname" placeholder="Your last name.." value={lname} onChange={e => setLname(e.target.value)} required></input>
                
                <label htmlFor="country">Country</label>
                <select id="country" name="country" value={country} onChange={e => setCountry(e.target.value)}>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="USA">USA</option>
                </select>

                <input type="submit" value="Submit"></input>
            </form>
        </div>
    )
}
