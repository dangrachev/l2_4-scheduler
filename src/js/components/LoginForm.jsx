import React, {useState} from 'react';

function LoginForm({submit, setPageMod}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form-wrapper'>
            <h1>Login</h1>
            <form onSubmit={(event) => submit(email, password, event)}
                  className='form'
                  id='login-form'>
                <div className="form-input">
                    <input value={email} onChange={e => setEmail(e.target.value)}
                           name='email'
                           id='email'
                           className='input'
                           placeholder='Enter email'/>
                    <label htmlFor="email"></label>
                </div>

                <div className="form-input">
                    <input value={password} onChange={e => setPassword(e.target.value)}
                           name='password'
                           id='password'
                           className='input'
                           placeholder='Enter password'/>
                    <label htmlFor="password"></label>
                </div>

                <button className="form-btn auth-form-btn" type='submit'>Login</button>

                <div>Or<button onClick={() => setPageMod('register')} className="form-btn_register">register now</button></div>
            </form>
        </div>
    );
}

export default LoginForm;