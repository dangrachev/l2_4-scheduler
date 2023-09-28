import {createContext, useReducer} from "react";
import {appReducer} from "../store/app-reducer";
import AuthContextProvider from "./AuthContextProvider";

export const AppContext = createContext({});

const initState = {
    tasks: [],
    users: [],
    isLoading: false
}
const AppContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(appReducer, initState);

    return (
        <AppContext.Provider value={{state, dispatch}}>
            <AuthContextProvider>
                {children}
            </AuthContextProvider>
        </AppContext.Provider>
    )
}

export default AppContextProvider;