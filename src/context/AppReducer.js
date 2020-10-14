// How we specificy app state changes in response to actions to our context
// Actions sent for reduction from GlobalState get handled depending on their action type
// Reducer is the way to change your state and pass down to components
// Must create new state and send that down

export default (state, action) => {
    // Create deep copy state as to not mutate original state (causes dupes and other unwanted behaviour)
    const newState = Object.assign({}, state);
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            return {
                // Send current state
                ...newState,
                // Set transactions[] value to all transactions apart from the one that's being deleted
                transactions: newState.transactions.filter(transaction => transaction.id !== action.payload),
                totalTransactions: newState.totalTransactions - 1
            }
        case 'ADD_TRANSACTION':
            return {
                ...newState,
                transactions: [action.payload, ...newState.transactions],
                totalTransactions: newState.totalTransactions + 1
            }
        case 'ADD_USER':
            return {
                ...newState,
                userList: [action.payload, ...newState.userList],
            }
        case 'DELETE_USER':
            return {
                ...newState,
                userList: newState.userList.filter(user => user.id !== action.payload)
            }
        default:
            return newState;
    }
}