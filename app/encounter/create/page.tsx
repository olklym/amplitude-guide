import { redirect } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TrackedLink } from "@/components/tracked-link";
import {
  createEncounterWithRandomDefaults,
  type Encounter,
} from "@/lib/mock-data";

async function createEncounter(formData: FormData) {
  "use server";

  const patientName = String(formData.get("patientName") || "").trim();
  const statusInput = String(formData.get("status") || "").trim();
  const details = String(formData.get("details") || "").trim();

  const allowedStatuses: Encounter["status"][] = [
    "Completed",
    "In Progress",
    "Scheduled",
  ];

  const status = allowedStatuses.includes(statusInput as Encounter["status"])
    ? (statusInput as Encounter["status"])
    : undefined;

  const encounter = createEncounterWithRandomDefaults({
    patientName: patientName || undefined,
    status,
    details: details || undefined,
  });

  redirect(`/encounter/${encounter.id}`);
}

export default function CreateEncounterPage() {
  return (
    <AppShell activeNav="dashboard" title="Create Encounter">
      <div className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">New Encounter</h2>
          <TrackedLink
            href="/"
            eventName="poc_create_encounter_cancelled"
            className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Cancel
          </TrackedLink>
        </div>

        <form action={createEncounter} className="space-y-5">
          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Patient Name (optional)
            </span>
            <input
              name="patientName"
              type="text"
              placeholder="Leave blank for random"
              className="h-10 w-full rounded-lg border border-slate-300 px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
            />
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Status (optional)
            </span>
            <select
              name="status"
              defaultValue=""
              className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="">Random</option>
              <option value="Scheduled">Scheduled</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </label>

          <label className="block space-y-1.5">
            <span className="text-sm font-medium text-slate-700">
              Details (optional)
            </span>
            <textarea
              name="details"
              rows={4}
              placeholder="Leave blank for random"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none focus:border-blue-500"
            />
          </label>

          <button
            type="submit"
            className="inline-flex rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
          >
            Create with random defaults
          </button>
        </form>
      </div>
    </AppShell>
  );
}
