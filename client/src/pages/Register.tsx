import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import { Link,useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';

const backend = import.meta.env.VITE_BACKEND

const schema = z.object({
  firstName: z.string(),
  lastName:z.string(),
  email:z.string().email(),
  password:z.string().min(8,{message:"password should be atleast 8 characters"})
})

type FormField = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate()
  const {register ,handleSubmit, setError, formState:{errors,isSubmitting} } = useForm<FormField>({
    resolver:zodResolver(schema)
  });

  const onSubmit:SubmitHandler<FormField>=async(data)=>{
    try{
      const res = await fetch(`${backend}/register`,{
        method:"POST",
        headers:{
          'Content-type':"application/json"
        },
        body:JSON.stringify(data)
      });
      const output = await res.json();
      if(!output.success){
        throw output.message
      }else{
        navigate('/home')
      }
    }catch(err){
      setError('root',{
        message:"Unknown error occured"
      })
    }
  }

  return (
    <>
    <section className="h-screen w-screen bg-[#F2F2F2] overflow-hidden flex justify-center items-center relative">
        <svg className="w-[900px] h-[700px] drop-shadow-xl " id="sw-js-blob-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs><linearGradient id="sw-gradient" x1="0" x2="1" y1="1" y2="0"><stop id="stop1" stopColor="rgba(255, 252, 0, 1)" offset="0%"></stop><stop id="stop2" stopColor="rgba(235.334, 169.059, 59.664, 1)" offset="100%"></stop> </linearGradient></defs><path fill="url(#sw-gradient)" d="M22,-32.3C27.7,-26.1,31.1,-18.7,33.2,-11C35.4,-3.4,36.4,4.4,34.8,11.9C33.2,19.5,29.1,26.9,22.8,30.7C16.6,34.4,8.3,34.5,0.1,34.3C-8,34.1,-16.1,33.6,-21.6,29.7C-27.1,25.7,-30.2,18.3,-33.8,10.3C-37.4,2.2,-41.5,-6.3,-39.6,-13C-37.6,-19.7,-29.5,-24.6,-21.9,-30.1C-14.3,-35.7,-7.1,-41.9,0.5,-42.6C8.1,-43.3,16.3,-38.5,22,-32.3Z" width="100%" height="100%" transform="translate(50 50)" strokeWidth="0" style={{transition:" all 0.3s ease 0s"}}></path>
        </svg>
        <div className=' w-max h-max absolute'>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-80 h-max  shadow-lg rounded-lg flex flex-col items-center pb-6">
            <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Sign Up</h2>
            <div className="grid md:grid-cols-2 font-GraphikBlack w-[80%] gap-3 ">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input {...register("firstName")} type="text" id="firstName" name="firstName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
                  <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                  <input {...register("lastName")} type="text" name="lastName" id="lastName"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
                  <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              </div>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <input {...register("email")} type="text" name="email" 
              className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <input {...register("password")} type="password" name="password" id="password" 
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " required />
              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 text-white px-16 rounded-full py-2 font-GraphikBlack">
              {isSubmitting ? 'Loading...':"Submit"}
            </button>
            <p className=" text-sm font-meduim font-GraphikBlack text-black mt-2">Already have an account ?
            <Link to={'/login'}><span className="text-[#0FADFF]"> Log in</span> </Link> </p>
            {errors.root && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.root?.message}</div>}
            {errors.email && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.email?.message}</div>}
            {errors.password && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.password?.message}</div>}
          </form>
        </div>
    </section>
    </>
  )
}
