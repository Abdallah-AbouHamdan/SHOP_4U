import { useState, type FormEvent } from "react";
import { useStore } from "../store/useStore";


const perks = [
  "Curated sellers with verified reviews so you shop with confidence.",
  "Fast checkout, transparent tracking, and 24/7 customer support.",
  "Exclusive drops, daily deals, and loyalty perks for returning shoppers.",
];

export default function Settings() {
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);
  const [passwordForm, setPasswordForm] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordForm({ current: "", next: "", confirm: "" });
  };

  return (
    <section className="bg-[#f8fafc] py-12">
      <div className="mx-auto w-11/12 max-w-6xl space-y-8">
        <header className="space-y-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Account
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">
            Manage your profile, reset your password, and learn why SHOP_4U delivers a
            modern retail experience.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Profile
                </p>
                <h2 className="text-xl font-semibold text-slate-900">
                  {user?.fullName ?? "Shopper"}
                </h2>
                <p className="text-sm text-slate-500">
                  {user?.email ?? "guest@shop4u.com"}
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
                {user?.accountType ?? "buyer"}
              </span>
            </div>
            <p className="text-sm text-slate-600">
              Keep your profile secure, control your preferences, and enjoy a tailored
              shopping experience. Update your details as needed and log out when you're
              done.
            </p>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-2xl bg-rose-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-600"
            >
              Logout
            </button>
          </div>

          
        </div>
      </div>
    </section>

  );
}
