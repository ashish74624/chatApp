interface Prosps {
    isSubmitting: boolean;
}

export default function AuthButton({ isSubmitting }: Prosps) {
    return (
        <button disabled={isSubmitting} className="bg-[#0FADFF] mt-2 text-white px-16 rounded-full py-2 font-GraphikBlack">
            {isSubmitting ? 'Loading...' : "Submit"}
        </button>
    )
}
