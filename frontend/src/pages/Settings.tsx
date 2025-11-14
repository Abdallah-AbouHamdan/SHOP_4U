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

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-full">
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

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-full">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
              Why choose SHOP_4U
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Built for modern discovery.
            </h3>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {perks.map((perk) => (
                <p key={perk} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-slate-900" />
                  {perk}
                </p>
              ))}
            </div>
          </div>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-full">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">Reset password</h3>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                secure
              </p>
            </div>
            <form className="mt-6 space-y-4 text-sm text-slate-600" onSubmit={handleSubmit}>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Current password
                </span>
                <input
                  type="password"
                  value={passwordForm.current}
                  required
                  onChange={(event) => handlePasswordChange("current", event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  New password
                </span>
                <input
                  type="password"
                  value={passwordForm.next}
                  required
                  onChange={(event) => handlePasswordChange("next", event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Confirm password
                </span>
                <input
                  type="password"
                  value={passwordForm.confirm}
                  required
                  onChange={(event) => handlePasswordChange("confirm", event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:bg-slate-800"
              >
                Save password
              </button>
            </form>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm h-full">
            <h3 className="text-lg font-semibold text-slate-900">Profile snapshot</h3>
            <dl className="mt-6 grid gap-4 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Email
                </dt>
                <dd className="font-semibold text-slate-900">{user?.email ?? "guest@shop4u.com"}</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Member since
                </dt>
                <dd className="font-semibold text-slate-900">2025</dd>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                <dt className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                  Preferred
                </dt>
                <dd className="font-semibold text-slate-900">
                  {user?.accountType ?? "buyer"}
                </dd>
              </div>
            </dl>
            <p className="mt-5 text-sm text-slate-500">
              Updating your profile keeps your recommendations and deliveries on point.
            </p>
          </div>
        </section>
      </div>
    </section>

  );
}
