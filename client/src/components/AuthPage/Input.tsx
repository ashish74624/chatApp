import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    name: string;
    id: string;
}

export default function Input({ type, name, id, ...rest }: InputProps,) {
    return (
        <input type={type ? type : "text"} name={name} id={id} {...rest} className="block py-2.5 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#0FADFF] focus:outline-none focus:ring-0 focus:border-[#0FADFF] peer" placeholder=" " />
    )
}