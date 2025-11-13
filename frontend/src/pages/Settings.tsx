export default function Settings() {
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
