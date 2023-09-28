import React, {useState} from 'react';

function RegisterForm({submit, setPageMod}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className='form-wrapper'>
            <h1>Registration</h1>
            <form onSubmit={(event) => submit(email, password, event)} className='form' id='registration-form'>
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

                <button className="form-btn auth-form-btn" type='submit'>Register</button>

                <div>Back to<button onClick={() => setPageMod('login')} className="form-btn_register">login page</button></div>
            </form>
        </div>
    );
}

export default RegisterForm;