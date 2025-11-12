import { type FormEvent } from "react"

export default function Login() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
    }
  return (
    <section className="bg-white">
        <div className="mx-auto flex min-h-[70vh] w-11/12 max-w-6xl flex-col items-center justify-center gap-10 px-4 py-10">
            <div className="text-center text-slate-500">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
                    Welcome Back
                </p>
                <h1 className="mt-2 text-2xl font-semibold text-slate-900 sm:text-3xl">
                    Sign in to continue shopping
                </h1>
            </div>
            <form onSubmit={handleSubmit}
                  className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">

                  </form>
        </div>
    </section>
  )
}
