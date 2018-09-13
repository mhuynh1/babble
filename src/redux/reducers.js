const initialState = {
    currentRoom: {},
    user: {}
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
        return {...state, user: action.user };
        
        case "ADD_CURRENT_ROOM":
        return {...state, currentRoom: action.room.currentRoom}
        
        default: return state
    }
}

