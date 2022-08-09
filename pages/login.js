import { useEffect, useState } from 'react';

import { login, profileAPI } from '../services/authServices';

import cookie from 'cookie';

import Router from 'next/router';

const Login = ({ data }) => {

    useEffect(() => {
        if (data.status === 200) {
            Router.push('/profile');
        }
    }, []);

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    // const cookies = new Cookies();

    const loginHandler = (e) => {
        
        e.preventDefault();

        try {

            const loginUser = login({ email: email, password: password });
            
            loginUser.then(data => {

                // cookies.set('token', data.token, {
                //     expires: new Date(Date.now() + 2592000),
                // });

                console.log(data);

                if (data.status == 200) {
                    Router.push('/profile');
                }

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

export async function getServerSideProps(context) {
    
    const parsedToken = cookie.parse(context.req.headers.cookie).token;

    const data = await profileAPI(parsedToken);

    return {
        props: {
            data,
        }
    }
};