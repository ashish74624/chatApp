import AuthPageSVG from "@/components/AuthPage/AuthPageSVG"
import { ReactNode } from "react"
interface Props {
    Form: ReactNode
}

export default function AuthPage({ Form }: Props) {
    return (
        <section className="h-screen w-screen bg-[#F2F2F2] overflow-hidden flex justify-center items-center relative">
            <AuthPageSVG />
            {Form}
        </section>
    )
}
