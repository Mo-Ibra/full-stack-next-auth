import { useState } from 'react';
import { register } from '../services/authServices';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = (e) => {

        e.preventDefault();

        try {

            const newUser = register({ name, email, password });
            
            console.log(newUser);
            newUser.then(data => {
                console.log(data.message);
            }).catch(err => {
                console.log(err);
            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h3>Register Page.</h3>
            <form onSubmit={registerHandler}>
                <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button>Register</button>
            </form>
        </div>
    )
}

export default Register;