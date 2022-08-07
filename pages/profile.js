import { profileAPI } from '../services/authServices';

import cookie from 'cookie';

const Profile = ({ user }) => {
    return (
        <div>
            Hello In Profile!
            <div>
                <p>Your name is {user.name}</p>
            </div>
            <div>
                <p>Your email is {user.email}</p>
            </div>
            <div>
                <p>You {user.isAdmin ? "Are" : "Are not"} Admin</p>
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
            user: data,
        }
    }
}