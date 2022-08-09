import Link from 'next/link';
import { logout, profileAPI } from '../services/authServices';
import cookie from 'cookie';

import Cookies from 'universal-cookie';

import Router from 'next/router';

const cookies = new Cookies();

const Home = ({ data }) => {

  const token = cookies.get('token');
  
  const logoutHandler = () => {

    const userAPI = logout(token);

    userAPI.then(data => {
      if (data.status === 200) {
        cookies.remove('token');
        Router.push('/');
      }
    });    
    // console.log(userAPI);
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
  
  const parsedToken = cookie.parse(context.req.headers.cookie).token;

  const data = await profileAPI(parsedToken);

  return {
    props: {
      data,
    }
  }
}