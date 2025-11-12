import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";


const accountTypes = [
    { value: "buyer", label: "Buyer - Shop for products" },
    { value: "seller", label: "Seller - Sell your products" }
]
export default function Signup() {
    const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
                    className="w-full max-w-md rounded-4xl border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
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

                        <label className="space-y-2 text-sm font-semibold text-slate-700">
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                                required />
                        </label>

                        <label className="space-y-2 text-sm font-semibold text-slate-700">
                            Password
                            <input
                                type="password"
                                name="password"
                                placeholder="**********"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white "
                                required />
                        </label>

                        <div className="space-y-3">
                            <p className="text-sm font-semibold text-slate-700">Account Type</p>
                            <div className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                {accountTypes.map((option) => (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-3 rounded-2xl border border-transparent px-3 py-2 text-sm text-slate-600 transition hover:border-slate-200">
                                        <input
                                            type="radio"
                                            name="accountType"
                                            value={option.value}
                                            checked={accountType === option.value}
                                            onChange={() =>
                                                setAccountType(option.value as "buyer" | "seller")
                                            }
                                            className="h-4 w-4 accent-slate-900" />
                                        <span>{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Create account
                        </button>
                        <p className="text-center text-sm text-slate-600">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
