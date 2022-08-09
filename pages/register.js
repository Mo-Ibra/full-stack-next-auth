import { useEffect, useState } from 'react';
import { profileAPI, register } from '../services/authServices';
import Router from 'next/router';
import cookie from 'cookie';

const Register = ({ data }) => {

    useEffect(() => {
        if (data.status === 200) {
            Router.push('/profile');
        }
    });

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerHandler = (e) => {

        e.preventDefault();

        try {
            const newUser = register({ name, email, password });
            newUser.then(data => {
                console.log(data.message);
                if (data.status === 201) {
                    Router.push('/login');
                }
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

export async function getServerSideProps(context) {
    const parsedToken = cookie.parse(context.req.headers.cookie).token;
    const data = await profileAPI(parsedToken);
    return {
        props: {
            data,
        }
    }
}