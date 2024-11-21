import Input from "../AuthPage/Input"
import AuthLabel from "../AuthPage/AuthLabel"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from 'zod'
import AuthButton from "../AuthPage/AuthButton";

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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-80 h-max pb-6 absolute shadow-lg rounded-lg flex flex-col items-center">
            <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Sign Up</h2>
            <div className="grid md:grid-cols-2 font-GraphikBlack w-[80%] gap-3 ">
                <div className="relative z-0 w-full mb-3 md:mb-6 group">
                    <Input {...register('firstName')} name="firstName" id="firstName" />
                    <AuthLabel text='First name' htmlFor='firstName' />
                </div>
                <div className="relative z-0 w-full mb-3 md:mb-6 group">
                    <Input {...register('lastName')} name="lastName" id="lastName" />
                    <AuthLabel text='Last Name' htmlFor='lastName' />
                </div>
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
                <Input {...register('email')} name="email" id="email" type="email" />
                <AuthLabel text='Email' htmlFor='email' />
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
                <Input {...register("password")} type="password" name="password" id="password" />
                <AuthLabel htmlFor='password' text='Password' />
            </div>
            <AuthButton isSubmitting={isSubmitting} />
            <p className=" text-sm font-meduim font-GraphikBlack text-black mt-2">Already have an account ?
                <Link to={'/login'}><span className="text-[#0FADFF]"> Log in</span> </Link> </p>
            {errors.root && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.root?.message}</div>}
            {errors.email && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.email?.message}</div>}
            {errors.password && <div className='text-red-500 text-sm font-GraphikBlack'>{errors.password?.message}</div>}
        </form>
    )
}
