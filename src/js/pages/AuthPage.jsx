import {useState} from "react";
import '../../assets/styles/form.css';
import {authReducer} from "../store/auth-reducer";
import {authInFirebase, registerInFirebase} from "../api/firebase-api";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function AuthPage() {
    const [pageMod, setPageMod] = useState('login');

    // Формируем объект формы и взависимости от id формы выполняем соответствующие запросы к firebase api
    const submit = (email, password, event) => {
        event.preventDefault();

        if (email && password) {
            const formData = {
                email: email,
                password: password
            }
            console.log(formData);

            // Проверяем форму по id
            if (event.target.id === 'login-form') {
                authInFirebase(formData);
            } else {
                registerInFirebase(formData);
            }
        } else {
            alert('Введите почту и пароль');
        }
    }

    return (
        <div>
            {pageMod === 'login'
                ? <LoginForm submit={submit} setPageMod={setPageMod} />
                : <RegisterForm submit={submit} setPageMod={setPageMod} />
            }
        </div>
    );
}

export default AuthPage;