import {useContext, useEffect} from "react";
import './App.css';
import {AuthContext} from "./js/components/AuthContextProvider";
import AuthPage from "./js/pages/AuthPage";
import HomePage from "./js/pages/HomePage";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";


function App() {
    const {state, dispatch} = useContext(AuthContext);

    useEffect(() => {
        dispatch({type: 'SET_LOADING', payload: true});

        // функция следит за состоянием авторизации
        onAuthStateChanged(auth, (data) => {
            if (data) {
                console.log(data);

                localStorage.setItem('is-auth', 'true');
                localStorage.setItem('token', data.uid);

                dispatch({type: 'AUTH', payload: data.email});
            }

            dispatch({type: 'SET_LOADING', payload: false});
        });
    }, []);

    if (state.isLoading) {
        return <div className='loading-indicator'></div>
    }

    return (
        <div className='App'>
            {state.isAuth
                ? <HomePage user={state.user}/>
                : <AuthPage />
            }
        </div>
  );
}

export default App;