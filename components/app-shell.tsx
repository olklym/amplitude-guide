"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/amplitude-client";
import { TrackedLink } from "@/components/tracked-link";

type AppShellProps = {
  activeNav: "dashboard" | "profile";
  title: string;
  children: ReactNode;
};

function navClass(isActive: boolean) {
  return isActive
    ? "rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700"
    : "rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100";
}

export function AppShell({ activeNav, title, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-[1400px]">
        <aside className="w-64 border-r border-slate-200 bg-white p-6">
          <div className="mb-8 text-2xl font-semibold text-blue-700">Test app</div>

          <nav className="flex flex-col gap-2">
            <TrackedLink
              href="/"
              eventName="poc_nav_dashboard_clicked"
              className={navClass(activeNav === "dashboard")}
            >
              Dashboard
            </TrackedLink>
            <TrackedLink
              href="/profile"
              eventName="poc_nav_profile_clicked"
              className={navClass(activeNav === "profile")}
            >
              Profile
            </TrackedLink>
          </nav>
        </aside>

        <section className="flex flex-1 flex-col">
          <header className="flex items-center gap-4 border-b border-slate-200 bg-white px-8 py-4">
            <input
              type="search"
              placeholder="Search for encounters or patients"
              className="h-10 w-full max-w-xl rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none focus:border-blue-500"
            />
            <div className="grid h-10 w-10 place-items-center rounded-full bg-slate-900 text-sm font-semibold text-white" />
          </header>

          <main className="flex-1 px-8 py-8">
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
              <div className="flex gap-3">
                <button
                  type="button"
                  className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                  data-amp-track-name="upload_or_drop"
                  data-amp-track-surface="app_shell_header_actions"
                  data-amp-track-location="shell"
                  onClick={() => trackEvent("poc_upload_clicked")}
                >
                  Upload or drop
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  onClick={() => {}}
                >
                  Edit file
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  onClick={() => {}}
                >
                  Share file
                </button>
              </div>
            </div>

            {children}
          </main>
        </section>
      </div>
    </div>
  );
}
