import Input from "../AuthPage/Input"
import AuthLabel from "../AuthPage/AuthLabel"
import AuthButton from "../AuthPage/AuthButton"
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { z } from 'zod'


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
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white w-80 h-max pb-6 absolute shadow-lg rounded-lg flex flex-col items-center">
            <h2 className=" font-GraphikBlack font-medium text-3xl mt-6 mb-4">Login</h2>
            <div className="relative z-0 w-[80%] group font-GraphikBlack mb-4">
                <Input {...register('email')} name="email" id="email" type="email" />
                <AuthLabel htmlFor="email" text="Email" />
            </div>
            <div className="relative z-0 w-[80%] mb-5 group font-GraphikBlack">
                <Input {...register("password")} type="password" name="password" id="password" />
                <AuthLabel htmlFor="password" text="Password" />
            </div>
            <AuthButton isSubmitting={isSubmitting} />
            <p className=" text-sm font-meduim font-GraphikBlack text-black mt-2">Dont have an account yet ? <Link to={'/register'}><span className="text-[#0FADFF]">Sign up</span></Link>  </p>
            {errors.root && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.root?.message}</div>}
            {errors.email && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.email?.message}</div>}
            {errors.password && <div className="text-red-500 font-GraphikBlack text-sm ">{errors.password?.message}</div>}
        </form>
    )
}
