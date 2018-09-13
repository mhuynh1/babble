const actionTypes = {
    ADD_CURRENT_ROOM: 'ADD_CURRENT_ROOM',
    SET_USER: 'SET_USER'
}

export const addCurrentRoom = room => ({ type: actionTypes.ADD_CURRENT_ROOM, room });
export const setUser = user => ({type:actionTypes.SET_USER, user });

