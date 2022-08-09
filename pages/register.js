import { useEffect, useState } from 'react';
import { profileAPI, register } from '../services/authServices';
import Router from 'next/router';
import cookie from 'cookie';
import Link from 'next/link';

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
        // <div>
        //     <h3>Register Page.</h3>
        //     <form onSubmit={registerHandler}>
        //         <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        //         <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
        //         <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
        //         <button>Register</button>
        //     </form>
        // </div>
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
                                <p className="text-center font-semibold mx-4 mb-0">Register</p>
                            </div>

                            <div className="mb-6">
                                <input
                                    type="text"
                                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                    placeholder="Your name"
                                    name='name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
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
                                    onClick={registerHandler}
                                >
                                    Register
                                </button>
                                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                    have an account?
                                    <Link
                                        href="/login"
                                    >
                                        <a
                                            className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                                        >
                                            Login
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