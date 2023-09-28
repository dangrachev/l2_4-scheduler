import {createContext, useReducer} from "react";
import {authReducer} from "../store/auth-reducer";
export const AuthContext = createContext({});

const initState = {
    isAuth: false,
    user: null,
    isLoading: false
}
const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initState);

    return (
        <AuthContext.Provider value={{state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;