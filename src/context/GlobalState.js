import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    transactions: [
          { id: 1, text: 'Flower', amount: -20 },
          { id: 2, text: 'Salary', amount: 300 },
          { id: 3, text: 'Book', amount: -10 },
          { id: 4, text: 'Camera', amount: 150 }
        ]
}

// Create global context and allow to bring into other files
export const GlobalContext = createContext(initialState);
// For components to have access to our global state need a provider

// Provider component
// Whenever we want to call a reducer action need to use dispatch
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Wrapping all our components (headers, transaction list etc... in our provider) as children
    return (<GlobalContext.Provider value={{transactions: state.transactions
    }}>
        {children}
    </GlobalContext.Provider>)
}