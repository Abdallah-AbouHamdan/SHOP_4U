import { useState } from "react";
import { useStore } from "../store/useStore";


const perks = [
  "Curated sellers with verified reviews so you shop with confidence.",
  "Fast checkout, transparent tracking, and 24/7 customer support.",
  "Exclusive drops, daily deals, and loyalty perks for returning shoppers.",
];

export default function Settings() {
  const user= useStore((state) => state.user);
  const logout= useStore((state) => state.logout);
  const [passwordForm, setPasswordForm] = useState({
    current:"",
    next:"",
    confirm:"",
  });

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
  setPasswordForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-white">
      <div className="mx-auto flex min-h-[60vh] w-11/12 max-w-4xl flex-col justify-center gap-6 py-12">
        <header className="space-y-2 text-center text-slate-600">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]">
            Account
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-500">
            Customize your SHOP_4U experience. More controls coming soon.
          </p>
        </header>
        <div className="rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center text-sm text-slate-500 shadow-[0_25px_80px_rgba(15,23,42,0.08)]">
          This page is a placeholder for upcoming preferences and profile
          controls.
        </div>
      </div>
    </section>
  );
}
