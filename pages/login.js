import { useEffect, useState } from 'react';

import { login, profileAPI } from '../services/authServices';

import cookie from 'cookie';

import Router from 'next/router';

import Link from 'next/link';

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
        <section className="h-screen">
            <div className="px-6 h-full text-gray-800">
                <div
                    className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
                >
                    <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                        <form>
                            <div
                                className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                            >
                                <p className="text-center font-semibold mx-4 mb-0">Login</p>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Email address"
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div className="mb-6">
                                <input
                                    type="password"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Password"
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-center lg:text-left">
                                <button
                                    type="button"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    onClick={loginHandler}
                                >
                                    Login
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    Don't have an account?
                                    <Link
                                        href="/register"
                                    >
                                        <a
                                            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >
                                            Register
                                        </a>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
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