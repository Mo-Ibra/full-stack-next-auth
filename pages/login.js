import { useState } from 'react'
import { login } from '../services/authServices';
import Cookies from 'universal-cookie';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const cookies = new Cookies();

    const loginHandler = (e) => {
        e.preventDefault();

        try {

            const loginUser = login({ email: email, password: password });
            
            loginUser.then(data => {
                console.log(data);
                console.log(data.message);
                cookies.set('token', data.token, {
                    expires: new Date(Date.now() + 2592000),
                });
                console.log(cookies.get('token'));
            }).catch(err => console.log(err));

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h3>Login Page.</h3>
            <form onSubmit={loginHandler}>
                <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;

