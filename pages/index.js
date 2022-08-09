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
    <>
      <div className='shadow-md py-5'>
        <div className='container mx-auto px-10'>
          <div className="flex justify-between items-center bg-white border-slate-200">
            <h3 className='text-blue-500 font-bold text-2xl'>Auth App</h3>
            {
              data.status === 200 ? (
                <div>
                  <button className='border border-red-500 text-red-500 hover:bg-red-500 hover:text-white duration-300 font-semibold py-1 px-5 rounded-md' onClick={logoutHandler}>Logout!</button>
                </div>
              ) : (
                <div>
                  <Link
                    href="/login"
                  >
                    <button className='bg-blue-500 text-white font-semibold py-1 px-5 rounded-md'>Login</button>
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <div className='container mx-auto px-10 text-center'>
        <h2 className='my-20 text-4xl font-bold text-blue-500 underline'>Welcome In Auth App!</h2>
      </div>
    </>
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