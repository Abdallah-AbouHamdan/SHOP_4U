import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import {
    isEmailValid,
    isPasswordValid,
    isUsernameValid,
    passwordRequirements,
    usernameRequirements,
} from "../utils/formValidation";
import { useStore } from "../store/useStore";


const accountTypes = [
    { value: "buyer", label: "Buyer - Shop for products" },
    { value: "seller", label: "Seller - Sell your products" }
];

export default function Signup() {
    const [accountType, setAccountType] = useState<"buyer" | "seller">("buyer");
    const [formError, setFormError] = useState<string | null>(null);
    const registerUser = useStore((s) => s.registerUser);
    const user = useStore((s) => s.user);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { from?: string } | null;
    const redirectPath =
        state?.from && state.from !== "/login" ? state.from : "/dashboard";

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const username = (formData.get("username") as string) ?? "";
        const email = (formData.get("email") as string) ?? "";
        const password = (formData.get("password") as string) ?? "";

        if (!isUsernameValid(username)) {
            setFormError(`Username must be ${usernameRequirements}.`);
            return;
        }
        if (!isEmailValid(email)) {
            setFormError("Please enter a valid email address.");
            return;
        }
        if (!isPasswordValid(password)) {
            setFormError(`Password must be ${passwordRequirements}.`);
            return;
        }

        setFormError(null);
        const result = registerUser({
            email: email.trim(),
            username: username.trim(),
            accountType,
            password,
        });
        if (!result.success) {
            setFormError(result.error ?? "Unable to create an account.");
            return;
        }
        navigate(redirectPath, { replace: true });
    };
    if (user) {
        return <Navigate to={redirectPath} replace />;
    }
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
                            Username
                            <input
                                type="text"
                                name="username"
                                autoComplete="username"
                                placeholder="shopper123"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                                required
                                onInput={() => setFormError(null)} />
                        </label>

                        <label className="space-y-2 text-sm font-semibold text-slate-700">
                            Email
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                                required
                                onInput={() => setFormError(null)} />
                        </label>

                        <label className="space-y-2 text-sm font-semibold text-slate-700">
                            Password
                            <input
                                type="password"
                                name="password"
                                placeholder="**********"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white "
                                required
                                onInput={() => setFormError(null)} />
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

                        {formError ? (
                            <p className="text-sm text-rose-500">{formError}</p>
                        ) : null}
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                            Create account
                        </button>
                        {formError && (
                            <p
                                className="text-center text-xs font-semibold uppercase tracking-[0.3em] text-rose-500"
                                role="alert"
                            >
                                {formError}
                            </p>
                        )}
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
