const initialState = {
    currentRoom: {},
    user: []
};

export const rootReducer = (state = initialState, action) => {
    debugger
    switch (action.type) {
        case "SAVE_USER":
        return {...state, user: [...state.user, action.user] };
        
        case "ADD_CURRENT_ROOM":
        return {...state, currentRoom: action.room.currentRoom}
        
        default: return state
    }
}

