import {useContext} from "react";
import {AuthContext} from "./AuthContextProvider";
import {logoutFromFirebase} from "../api/firebase-api";
import "../../assets/styles/Header.css";

function Header() {
    const {state, dispatch} = useContext(AuthContext);

    const logout = () => {
        logoutFromFirebase().then(() => {
            dispatch({type: 'LOGOUT'});

            localStorage.removeItem('is-auth');
            localStorage.removeItem('token');
        });
    }

    return (
        <div className="header">
            <span className="greeting">Welcome to home page, {state?.user?.split('@')[0]}!</span>
            <button className="btn-logout" onClick={logout}>Logout</button>
        </div>
    );
}

export default Header;