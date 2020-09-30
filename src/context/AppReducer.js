// How we specificy app state changes in response to actions to our context
// Actions sent for reduction from GlobalState get handled depending on their action type
// Reducer is the way to change your state and pass down to components
// Must create new state and send that down

export default (state, action) => {
    switch(action.type) {
        case 'DELETE_TRANSACTION':
                console.log(`${action.type} with action ${action.payload}`);
            return {
                // Send current state
                ...state,
                // Set transactions[] value to all transactions apart from the one that's been deleted
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload),
                totalTransactions: state.totalTransactions--
            }
            case 'ADD_TRANSACTION':
                console.log(`${action.payload.id} ${action.type}`)
                return {
                    //
                    ...state,
                    transactions: [action.payload, ...state.transactions],
                    totalTransactions: state.totalTransactions++
                }
        default:
            return state;
    }
}