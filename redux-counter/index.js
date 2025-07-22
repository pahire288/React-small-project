// index.js

const redux = require('redux');
const createStore = redux.createStore;

// Action Types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const INCREMENTBY2 = "INCREMENTBY2";
const DECREMENTBY2 = "DECREMENTBY2";

// Action Creators
const increment = () => {
    return {
        type: INCREMENT
    };
};

const decrement = () => {
    return {
        type: DECREMENT
    };
};

const incrementBy2 = () => {
    return {
        type: INCREMENTBY2
    };
};

const decrementBy2 = () => {
    return {
        type: DECREMENTBY2
    };
};

// Initial State
const initialState = {
    counter: 0
};

// Reducer
const counterReducer = (state = initialState, action) => {
    switch(action.type) {
        case INCREMENT:
            return { counter: state.counter + 1 };
        case DECREMENT:
            return { counter: state.counter - 1 };
        case INCREMENTBY2:
            return { counter: state.counter + 2 };
        case DECREMENTBY2:
            return { counter: state.counter - 2 };
        default:
            return state;
    }
};

// Store
const store = createStore(counterReducer);

// Subscribe to store
store.subscribe(() => {
    console.log("Current State:", store.getState());
});

// Dispatch actions
store.dispatch(increment());     // +1
store.dispatch(incrementBy2());  // +2
store.dispatch(decrement());     // -1
store.dispatch(decrementBy2());  // -2
