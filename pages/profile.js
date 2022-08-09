import { profileAPI } from '../services/authServices';

import cookie from 'cookie';

import Router from 'next/router';

import { useEffect } from 'react';

const Profile = ({ data }) => {

    useEffect(() => {
        if (data.status !== 200) {
            Router.push('/');
        }
    }, []);

    // Component For User.
    if (data.isAdmin) {
        return (
            <div>
                <h3>Hello ADMIN</h3>
                <div>
                    <p>Your name is {data.name}</p>
                </div>
                <div>
                    <p>Your email is {data.email}</p>
                </div>
                <div>
                    <p>You {data.isAdmin ? "Are" : "Are not"} Admin</p>
                </div>
            </div>
        )
    }

    // Component For Admin.
    return (
        <div>
            <h3>Hello USER</h3>
            <div>
                <p>Your name is {data.name}</p>
            </div>
            <div>
                <p>Your email is {data.email}</p>
            </div>
            <div>
                <p>You {data.isAdmin ? "Are" : "Are not"} Admin</p>
            </div>
        </div>
    )
}

export default Profile;

export async function getServerSideProps(context) {

    const parsedToken = cookie.parse(context.req.headers.cookie).token;

    const data = await profileAPI(parsedToken);

    return {
        props: {
            data: data,
        }
    }
}