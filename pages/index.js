import Link from 'next/link';
import { logout, profileAPI } from '../services/authServices';
import cookie from 'cookie';

import Router from 'next/router';

const Home = ({ data, token }) => {

  const logoutHandler = () => {

    const logoutAPI = logout(token);

    console.log(token);

    logoutAPI.then(data => {
      if (data.status === 200) {
        console.log('Removed');
        Router.push('/');
      }
    });
    // console.log(logoutAPI);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h3>Auth App</h3>
        {
          data.status === 200 ? (
            <div>
              <button onClick={logoutHandler}>Logout!</button>
            </div>
          ) : (
            <div>
              <Link
                href="/login"
              >
                <button>Login</button>
              </Link>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Home;

export async function getServerSideProps(context) {

  const token = cookie.parse(context.req.headers.cookie).token

  const parsedToken = token;

  const data = await profileAPI(parsedToken);
    return {
      props: {
        data,
        token: token ? token : null,
      }
    }
}