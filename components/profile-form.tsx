"use client";

import { trackEvent } from "@/lib/amplitude-client";

export function ProfileForm() {
  return (
    <form className="max-w-2xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-2">
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue="Olivia Kim"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          defaultValue="olivia.kim@amplifile.io"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue="secret123"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <div className="grid gap-2">
        <label htmlFor="role" className="text-sm font-medium text-slate-700">
          Role
        </label>
        <input
          id="role"
          name="role"
          type="text"
          defaultValue="Care Coordinator"
          className="h-11 rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
        />
      </div>

      <button
        type="button"
        className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        onClick={() => {
          trackEvent("poc_profile_save_clicked", {
            section: "profile",
          });
        }}
      >
        Save changes
      </button>
    </form>
  );
}
