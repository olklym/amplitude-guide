"use client";

import { useMemo, useState } from "react";
import {
  refreshGuides,
  showGuide,
  trackEvent,
} from "@/lib/amplitude-client";

export function GuideControls() {
  const defaultFlagKey = useMemo(
    () => process.env.NEXT_PUBLIC_AMPLITUDE_GUIDE_FLAG_KEY ?? "",
    [],
  );
  const [flagKey, setFlagKey] = useState(defaultFlagKey);
  const [status, setStatus] = useState("No action yet");

  const commonButtonClass =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50";

  return (
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
        Amplitude Guide POC Controls
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Use these controls to validate guide rendering and trigger behavior.
      </p>

      <div className="mt-4 flex flex-wrap items-end gap-3">
        <label className="grid gap-1">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Guide Flag Key
          </span>
          <input
            value={flagKey}
            onChange={(event) => setFlagKey(event.target.value)}
            placeholder="onboarding_guide_flag_key"
            className="h-10 min-w-72 rounded-lg border border-slate-300 px-3 text-sm outline-none focus:border-blue-500"
          />
        </label>

        <button
          type="button"
          className={commonButtonClass}
          data-amp-track-name="show_guide"
          data-amp-track-surface="guide_controls"
          onClick={() => {
            if (!flagKey.trim()) {
              setStatus("Add a flag key first.");
              return;
            }

            const shown = showGuide(flagKey.trim(), 0);
            trackEvent("poc_manual_show_guide", { flagKey: flagKey.trim() });
            setStatus(shown ? `Guide requested: ${flagKey.trim()}` : "Guide SDK not ready.");
          }}
        >
          Show Guide
        </button>

        <button
          type="button"
          className={commonButtonClass}
          data-amp-track-name="refresh_guides"
          data-amp-track-surface="guide_controls"
          onClick={async () => {
            const refreshed = await refreshGuides();
            trackEvent("poc_manual_refresh_guides");
            setStatus(refreshed ? "Guide config refreshed." : "Guide SDK not ready.");
          }}
        >
          Refresh Guides
        </button>

      </div>

      <p className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-sm text-slate-700">
        {status}
      </p>
    </section>
  );
}
