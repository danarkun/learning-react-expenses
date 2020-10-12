import React, { useState, useContext } from 'react'
import { GlobalContext } from '../context/GlobalState';

// export const AddUser = ( {history} ) => {
export const AddUser = ( {history} ) => {
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [country, setCountry] = useState('Australia');
    const { addUser } = useContext(GlobalContext);

    const onSubmit = e => {
        e.preventDefault();
    
        const newUser = {
            lname,
            fname,
            country
        }

        addUser(newUser).then(() => {
            history.push("/ExpenseTracker");
        })
    }

    return (
        <div>
            <h1>ADD USER</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." value={fname} onChange= {e => setFname(e.target.value)}></input>

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." value={lname} onChange={e => setLname(e.target.value)}></input>

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