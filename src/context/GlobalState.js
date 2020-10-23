import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { getData, storeData } from '../helpers/localStorage';

// Initial state
const initialState = () => getData('data') || initStateObj;

const initStateObj = {
    transactions: [],
    totalTransactions: 0,
    userList: []
}

// const initialState = {
//     transactions: [
//         // {"id":230053,"text":"Bills","amount":-5000,"user":1,"timeStamp":"2020-10-20T03:50:21.179Z"},{"id":190509,"text":"Random Goods","amount":-10000,"user":1,"timeStamp":"2020-10-20T03:49:47.579Z"},{"id":879335,"text":"Food","amount":-8000,"user":"2","timeStamp":"2020-10-20T03:42:57.068Z"},{"id":59272,"text":"Rat","amount":-2500,"user":"2","timeStamp":"2020-10-20T03:41:19.075Z"},{"id":867048,"text":"Vehicular","amount":-5000,"user":"2","timeStamp":"2020-10-20T03:39:11.796Z"},{"id":578987,"text":"Mortgage","amount":-20670,"user":"2","timeStamp":"2020-10-20T03:37:04.488Z"},{"id":761742,"text":"Salary","amount":57200,"user":"1","timeStamp":"2020-10-20T03:35:19.108Z"},{"id":713351,"text":"Salary","amount":53663,"user":"2","timeStamp":"2020-10-20T03:33:53.501Z"}
//         {
//             id: 321890,
//             text: "Salary",
//             amount: 2000,
//             user: 1,
//             timeStamp: new Date()
//         },
//         {
//             id: 839217,
//             text: "Groceries",
//             amount: -125,
//             user: 2,
//             timeStamp: new Date()
//         }
//     ],
//     totalTransactions: 0,
//     userList: [
//         {
//             id: 1,
//             lname: "James",
//             fname: "Bel",
//             country: "Australia",
//             timeStamp: new Date()
//         },
//         {
//             id: 2,
//             lname: "Arkun",
//             fname: "Dan",
//             country: "Australia",
//             timeStamp: new Date()
//         },
//         {
//             id: 10251029,
//             lname: "Arkun",
//             fname: "Sophie",
//             country: "Canada",
//             timeStamp: new Date()
//         }
//     ]
// }

// Create global context and allow to bring into other files
export const GlobalContext = createContext(initialState());
// For components to have access to our global state need a provider

// Provider component
// Whenever we want to call a reducer action need to use dispatch
// NOTE: Reducer is a pure function that takes the previous state and an action (state, dispatch) and returns the next state
//       It's called a reducer because it's the type of function you would pass to Array.prototype.reduce(reducer, ?initialValue)
//       We are defining and passing dispatch as the function for the reducer to use on all elements of the state
export const GlobalProvider = ({ children }) => {
    // Setting our current state to initial state
    const [state, dispatch] = useReducer(AppReducer, initialState());

    // Store data anytime state changes during a rerender
    useEffect(() => {
        storeData('data', state);
    }, [state]);
    
    // Actions that make calls to reducer
    // Dispatches an object to reducer with the type of object (DELETE_TRANSACTION) with the transactions id
    function deleteTransaction(id) {
        return Promise.resolve(
            dispatch({
                type: 'DELETE_TRANSACTION',
                payload: id
            })
        );
    }

    function addTransaction(transaction) {
        return Promise.resolve(
            dispatch({
                type: 'ADD_TRANSACTION',
                payload: transaction
            })
        );
    }

    function addUser(user) {
        return Promise.resolve(
            dispatch({
                type: 'ADD_USER',
                payload: user
            })
        );
    }

    function deleteUser(id) {
        return Promise.resolve(
            dispatch({
                type: 'DELETE_USER',
                payload: id
            })
        );
    }

    function clearData() {
        // return Promise.resolve(
        //     dispatch({
        //         type: 'CLEAR_DATA'
        //     })
        // );
        dispatch({
            type: 'CLEAR_DATA'
        })
    }

    // Wrapping all our components (headers, transaction list etc... in our provider) as children
    // and giving them access to everything in the value prop
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        totalTransactions: state.totalTransactions,
        userList: state.userList,
        deleteTransaction,
        addTransaction,
        addUser,
        deleteUser,
        clearData
    }}>
        {children}
    </GlobalContext.Provider>)
}