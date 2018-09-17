// /** ACTIONS
//  * actions are just objects
//  * every action needs a type property to describe how the state should change
//  */
// const actionTypes = {
//     SAVE_USER: "SAVE_USER"
// }

// export const saveUser = user => ({ type: actionTypes.SAVE_USER, user });



// /** REDUCERS
//  * reducer is a function that take two params: current state and action 
//  * have switch statements for diff cases
//  */

// const initialState = {
//     user: []
// };

// export const rootReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case "SAVE_USER": return [...state.user, action.user];
//         default: return state
//     }
// }

// /**
//  * createStore() creates the Redux store
//  * takes a reducer as the first argument
//  * 
//  * can also pass in initial state, but that is more useful for serverside rendering
//  * 
//  * TAKEAWAY: State comes from reducers!
//  */

// import { createStore } from 'redux';
// import { rootReducer } from './reducers'

// const store = createStore(rootReducer)

// export default store;

// /**
//  * test in console
//  * 
//  * in index.js window.store = store; window.saveUser = saveUser;
//  * 
//  * methods will be available in console
//  * 
//  * store.getState() // -> {user: Array(0)}
//  * 
//  * store.subscribe(() => { console.log('redux is reduxing') })
//  * 
//  * store.dispatch(saveUser({name: 'billyGeorge', age: 26})) // -> 'redux is reduxing'
//  * 
//  * store.getState() // -> {users:[{name: 'billyGeorge', age: 26}]}
//  * 
//  * store.dispatch(saveUser({name: 'henry', age: 12})) // -> 'redux is reduxing'
//  * store.getState() // -> {users:[{name: 'billyGeorge', age: 26}, name: 'henry', age: 12]}
//  * 
//  *
//  * 
//  * REACT-REDUX is a library to bind redux to React
//  * 
//  * connect() is the the most important method to do this.
//  * connect() takes 2 or 3 arguments depending on use case
//  * 
//  * 2 fundmental functions to know:
//  * mapStateToProps - connect part of Redux state to props of a React component. the React component will then have access to the part of the store it needs
//  * 
//  * mapDispatchToProps - connects Redux actions to React props.  The React component will be able to dispatch the actions
//  * 
//  *  <Provider store={store}/> is the high order component from react-redux that will wrap your component and give it access to the entire Redux store as its prop
//  * 
//  */

