import { useState, type FormEvent } from "react";


const accountTypes= [
    {value:"buyer", label:"Buyer - Shop for products"},
    { value:"seller", label: "Seller - Sell your products"}
]
export default function Signup() {
    const [accounType,setAccountType] = useState<"buyer" | "seller">("buyer");

    const handleSubmit = (event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault();
    };

  return (
    <section className="bg-white">
        <div className="mx-auto flex min-h-[70vh] w-11/12 max-w-6xl flex-col items-center justify-center gap-10 px-4 py-10">
            <header className="text-center text-slate-500">
                <p className="text-xs font-semibold uppercase tracking[0.3em] sm:text-sm">
                    Create account
                </p>
                <h1 className="text-sm font-semibold text-slate-900 sm:text-3xl">
                    Sign up to start shopping
                </h1>
            </header>

            <form 
            onSubmit={handleSubmit}
            className="w-full max-w-md rounded-[32px] border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                <div className="space-y-6">
                    <div className="space-y-1">
                        <h2 className="text-xl font-semibold text-slate-900">Sign Up</h2>
                        <p className="text-sm text-slate-500">
                            Enter your details to create an account
                        </p>
                    </div>
                    
                    <label className="space-y-2 text-sm font-semibold text-slate-700">
                        Full Name 
                        <input 
                        type="text"
                        name="fullName"
                        placeholder="John Doe"
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                        required />
                    </label>
                </div>
            </form>
        </div>
    </section>
  )
}
