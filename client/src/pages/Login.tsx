import Input from "@/components/AuthPage/Input";
import AuthPageSVG from "@/components/AuthPageSVG";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod'

// const backend = import.meta.env.VITE_BACKEND

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
});

type FormField = z.infer<typeof schema>

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormField>(
    {
      resolver: zodResolver(schema)
    });
  const onSubmit: SubmitHandler<FormField> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error
      console.log(data)
    } catch (error) {
      setError("root", {
        message: "Email already taken"
      })
    }
  }

  return (

    <>
      <section className="h-screen w-screen bg-[#F2F2F2] overflow-hidden flex justify-center items-center relative">
        <AuthPageSVG />
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-80 h-max pb-6 absolute shadow-lg rounded-lg flex flex-col items-center">
          <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Login</h2>
          <div className="relative z-0 w-[80%] group font-GraphikBlack mb-4">
            <Input {...register('email')} name="email" id="email" type="email" />
            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
          </div>
          <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
            <Input {...register("password")} type="password" name="password" id="password" />
            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-[#0FADFF] peer-focus:dark:text-[#0FADFF] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>

          </div>
          {/* <p className=" text-sm font-semibold font-GraphikBlack text-[#0FADFF]">Forgot password ?</p> */}
          <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 text-white px-16 rounded-full py-2 font-GraphikBlack">{isSubmitting ? 'Loading...' : "Submit"}</button>
          <p className=" text-sm font-meduim font-GraphikBlack text-black mt-2">Dont have an account yet ? <Link to={'/register'}><span className="text-[#0FADFF]">Sign up</span></Link>  </p>
          {errors.root && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.root?.message}</div>}
          {errors.email && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.email?.message}</div>}
          {errors.password && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.password?.message}</div>}
        </form>
      </section>
    </>
  )
}
