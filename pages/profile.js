import { profileAPI } from '../services/authServices';

import cookie from 'cookie';

import Link from 'next/link';

const Profile = ({ data }) => {

    if (data.name === 'JsonWebTokenError') {
        return <h1>Login From <Link href="/login"><a>Here</a></Link></h1>
    }

    return (
        <div>
            Hello In Profile!
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