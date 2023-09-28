const initialState = {
    tasks: [],
    users: [],
    isLoading: false
}


export function appReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        case 'SET_TASKS':
            return {
                ...state,
                tasks: action.payload
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.payload
            }
        case 'ADD_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'EDIT_TASK':
            return {
                ...state,
                tasks:  state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return action.payload;
                    }
                    return task;
                })
            }
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
    }
}