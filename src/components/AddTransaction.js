import React, { useState, useContext } from 'react'
import { User } from './User'
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Select, FormControl, MenuItem, InputLabel, FormHelperText } from '@material-ui/core';
import { GlobalContext } from '../context/GlobalState';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

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
    const [userID, setUser] = useState("default");

    const classes = useStyles();

    const onSubmit = e => {
        e.preventDefault();
        if (!selectedUser) {
            alert("Select a user");
            return;
        }

        // Get user object from userID
        const userObj = GetUser(userID);

        const newTransaction = {
            id: generateID(),
            text,
            amount: +amount,
            user: userID,
            timeStamp: new Date(),
            userName: `${userObj.fname} ${userObj.lname}`
        }

        addTransaction(newTransaction)
            .then(() => {
                ResetForm();
            })
            .catch((err) => {
                console.error(`AddTransaction promise error: ${err}`);
            })
    }

    function GetUser(userID) {
        return userList.find(u => u.id == userID);
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

    function SelectUser(user) {
        setUser(user);
        setSelected(true);
    }

    return (
        <>
            <h3>Add new transaction</h3>
            <form name="transForm" id="transForm" onSubmit={onSubmit}>
                <div className="form-control">
                    <label htmlFor="text"><b>Text</b></label><br />
                    <TextField variant="outlined" type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Enter text..." required />
                </div>
                <div className="form-control">
                    <label htmlFor="amount"
                    ><b>Amount</b> <br />(Negative: expense, Positive: income)</label><br />
                    <TextField variant="outlined" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Enter amount..." required />
                </div>
                <div className="formcontrol">
                    <label htmlFor="user"><b>Assign User</b></label><br />


                    <FormControl variant="outlined" className={classes.formControl}>
                        <Select
                            id="user"
                            name="user"
                            value={userID}
                            onChange={e => SelectUser(e.target.value)}
                            displayEmpty
                            className={classes.selectEmpty}
                            inputProps={{ "aria-label": "Without label" }}
                            required
                        >
                            <MenuItem value="default" disabled>
                                Select User
                            </MenuItem>
                            {userList.map((user) =>
                                <MenuItem key={user.id} value={user.id}>{user.fname} {user.lname}</MenuItem>)}
                        </Select>
                        <FormHelperText>User</FormHelperText>
                    </FormControl>
                </div>
                <input type="submit" id="subButton" className={`${userList.length === 0 ? "blocked" : ""} btn`} value={userList.length === 0 ? "Add Atleast One User" : "Add transaction"}></input>
            </form>
        </>
    )
}
