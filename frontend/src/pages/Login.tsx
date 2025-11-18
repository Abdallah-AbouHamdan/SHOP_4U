import { useState, type FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { isEmailValid, isPasswordValid, passwordRequirements } from "../utils/formValidation";
import { useStore } from "../store/useStore";

export default function Login() {
    const login = useStore((s) => s.login);
    const user = useStore((s) => s.user);
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { from?: string } | null;
    const redirectPath = 
        state?.from && state.from !== "/login" ? state.from : "/dashboard";

    if(user){
        return <Navigate to={redirectPath} replace />;
    }
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = (formData.get("email") as string) ?? "";
        const password = (formData.get("password") as string) ?? "";
        const trimmedPassword = password.trim();

        if (!isEmailValid(email)) {
            setFormError("Please enter a valid email address.");
            return;
        }
        if (!isPasswordValid(trimmedPassword)) {
            setFormError(`Password must be ${passwordRequirements}.`);
            return;
        }

        setFormError(null);
        const result = login({
            email: email.trim(),
            password: trimmedPassword,
        });
        if (!result.success) {
            setFormError(result.error ?? "Unable to sign in.");
            return;
        }
        navigate(redirectPath, { replace: true });
    };
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
                    noValidate
                    className="w-full max-w-md rounded-4xl border border-slate-200 bg-white px-6 py-8 text-slate-900 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
                    <div className="space-y-6">
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold text-slate-900">Sign In</h2>
                            <p className="text-sm text-slate-500">
                                Enter your credentials to access your account
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-slate-700">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:bg-white"
                                type="email"
                                required
                                onInput={() => setFormError(null)} />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-slate-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="**********"
                                className="w-full rounded-2xl border borer-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 focus:bg-white"
                                required
                                onInput={() => setFormError(null)} />
                        </div>
                         {formError ? (
                            <p className="text-sm text-rose-500">{formError}</p>
                        ) : null}
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Sign in
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
                            Don&apos;t have an account?{" "}
                            <Link to="/signup" className="font-semibold text-slate-900 underline-offset-2 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </section>
    );
}
