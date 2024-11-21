import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from '@hookform/resolvers/zod';
import AuthPageSVG from '@/components/AuthPageSVG';
import Input from '@/components/AuthPage/Input';
const backend = import.meta.env.VITE_BACKEND

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, { message: "password should be atleast 8 characters" })
})

type FormField = z.infer<typeof schema>

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormField>({
    resolver: zodResolver(schema)
  });

  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      const res = await fetch(`${backend}/register`, {
        method: "POST",
        headers: {
          'Content-type': "application/json"
        },
        body: JSON.stringify(data)
      });
      const output = await res.json();
      if (!output.success) {
        throw output.message
      } else {
        navigate('/home')
      }
    } catch (err) {
      setError('root', {
        message: "Unknown error occured"
      })
    }
  }

  return (
    <>
      <section className="h-screen w-screen bg-[#F2F2F2] overflow-hidden flex justify-center items-center relative">
        <AuthPageSVG />
        <div className=' w-max h-max absolute'>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-80 h-max  shadow-lg rounded-lg flex flex-col items-center pb-6">
            <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Sign Up</h2>
            <div className="grid md:grid-cols-2 font-GraphikBlack w-[80%] gap-3 ">
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <Input {...register('firstName')} name="firstName" id="firstName" />

                <label htmlFor="firstName" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              </div>
              <div className="relative z-0 w-full mb-3 md:mb-6 group">
                <Input {...register('lastName')} name="lastName" id="lastName" />

                <label htmlFor="lastName" className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              </div>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <Input {...register('email')} name="email" id="email" type="email" />

              <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
              <Input {...register("password")} type="password" name="password" id="password" />

              <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
            </div>
            <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 text-white px-16 rounded-full py-2 font-GraphikBlack">
              {isSubmitting ? 'Loading...' : "Submit"}
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
