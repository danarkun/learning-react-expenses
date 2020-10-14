import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: [
        {
            id: 321890,
            text: "Salary",
            amount: 2000,
            user: "1"
        },
        {
            id: 839217,
            text: "Groceries",
            amount: -125,
            user: "2"
        }
    ],
    totalTransactions: 0,
    userList: [
        {
            id: "1",
            lname: "James",
            fname: "Bel",
            country: "Australia"
        },
        {
            id: "2",
            lname: "Arkun",
            fname: "Dan",
            country: "Australia"
        },
        {
            id: 10251029,
            lane: "Arkun",
            fname: "Sophie",
            country: "Canada"
        }
    ]
}

// Create global context and allow to bring into other files
export const GlobalContext = createContext(initialState);
// For components to have access to our global state need a provider

// Provider component
// Whenever we want to call a reducer action need to use dispatch
// NOTE: Reducer is a pure function that takes the previous state and an action (state, dispatch) and returns the next state
//       It's called a reducer because it's the type of function you would pass to Array.prototype.reduce(reducer, ?initialValue)
//       We are defining and passing dispatch as the function for the reducer to use on all elements of the state
export const GlobalProvider = ({ children }) => {
    // Setting our current state to initial state
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions that make calls to reducer

    // Dispatches an object to reducer with the type of object (DELETE_TRANSACTION) with the transactions id
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
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
        dispatch({
            type:'DELETE_USER',
            payload: id
        })
    }

    // Wrapping all our components (headers, transaction list etc... in our provider) as children
    return (<GlobalContext.Provider value={{
        transactions: state.transactions,
        totalTransactions: state.totalTransactions,
        userList: state.userList,
        deleteTransaction,
        addTransaction,
        addUser,
        deleteUser
    }}>
        {children}
    </GlobalContext.Provider>)
}