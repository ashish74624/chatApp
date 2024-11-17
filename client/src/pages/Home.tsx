import { useEffect } from 'react';
import Cookies from 'js-cookie';

const Home = () => {
  useEffect(() => {
    
    const tokenCookie = Cookies.get('token');
    console.log('Token from cookie:', tokenCookie);
  }, []);

  return (
    <section className='bg-[#F2F2F2] h-screen w-screen'>
      Home
    </section>
  );
};

export default Home;
