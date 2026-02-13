import { AppShell } from "@/components/app-shell";
import { GuideControls } from "@/components/guide-controls";
import { TrackedLink } from "@/components/tracked-link";
import { encounters } from "@/lib/mock-data";

function formatDateTime(dateIso: string) {
  return new Date(dateIso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  return (
    <AppShell activeNav="dashboard" title="Dashboard">
      <GuideControls />
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid grid-cols-[1.3fr_1fr_1fr_0.7fr] gap-4 border-b border-slate-200 px-3 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>Patient</span>
          <span>Start Date</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        <ul className="divide-y divide-slate-100">
          {encounters.map((encounter) => (
            <li key={encounter.id}>
              <div className="grid grid-cols-[1.3fr_1fr_1fr_0.7fr] items-center gap-4 px-3 py-4">
                <div>
                  <p className="font-medium text-slate-900">
                    {encounter.patientName}
                  </p>
                  <p className="text-sm text-slate-500">{encounter.id}</p>
                </div>
                <p className="text-sm text-slate-700">
                  {formatDateTime(encounter.startDt)}
                </p>
                <p className="text-sm text-slate-700">{encounter.status}</p>
                <TrackedLink
                  href={`/encounter/${encounter.id}`}
                  eventName="poc_open_encounter"
                  eventProperties={{
                    encounterId: encounter.id,
                    status: encounter.status,
                  }}
                  className="inline-flex w-fit rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100"
                >
                  Open
                </TrackedLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
