const initialState = {
    isAuth: false,
    user: null,
    isLoading: false
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case "AUTH":
            return {
                ...state,
                isAuth: true,
                user: action.payload
            }
        case "LOGOUT":
            return {
                ...state,
                isAuth: false,
                user: null
            }
        case 'SET_LOADING':
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state;
    }
}

