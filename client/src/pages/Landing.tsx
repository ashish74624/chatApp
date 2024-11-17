import {Link } from 'react-router-dom'
export default function Landing() {
  return (
    <section className=" w-screen h-screen bg-[#fffc00] overflow-hidden">
    <nav className=" h-14 w-screen font-GraphikBlack text-4xl px-4 pt-4 pb-8">
        Stories
    </nav>
    <section className='h-full  w-screen flex justify-center mt-10'>
        <div className=" w-[95%] border h-[450px] flex border-black rounded-xl">
            <div className="w-[50%] flex flex-col items-center font-GraphikBlack my-auto space-y-4">
                <p className="text-black text-5xl w-[520px] ">Chat, Snap, and video call your friends from wherever you are.</p>
                <p className="text-gray-100 text-4xl">Get Started</p>
                <div className=" space-x-6">
                    <Link to={'/login'}>
                        <button  className="w-24 py-2 bg-black text-white rounded-full">Login</button>
                    </Link>
                    <Link to={'/register'}>
                        <button className="w-24 py-2 bg-black text-white rounded-full">Sign Up</button>
                    </Link>
                </div>
            </div>
            <img className=" h-[600px] w-[65%] " src="https://image-get.vercel.app/ashishkumar74624@gmail.com/Stories/a.png" alt="hello"  />
        </div>
    </section>
    </section>
    
  )
}
