import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
import { TrackedLink } from "@/components/tracked-link";
import {
  CREATED_ENCOUNTERS_COOKIE,
  readCreatedEncountersFromCookie,
} from "@/lib/created-encounters-cookie";
import { getEncounterById } from "@/lib/mock-data";

type EncounterPageProps = {
  params: Promise<{ id: string }>;
};

function formatDateTime(dateIso: string) {
  return new Date(dateIso).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function EncounterPage({ params }: EncounterPageProps) {
  const { id } = await params;
  let encounter = await getEncounterById(id);

  if (!encounter) {
    const cookieStore = await cookies();
    const createdEncounters = readCreatedEncountersFromCookie(
      cookieStore.get(CREATED_ENCOUNTERS_COOKIE)?.value,
    );
    encounter = createdEncounters.find((item) => item.id === id);
  }

  if (!encounter) {
    notFound();
  }

  return (
    <AppShell activeNav="dashboard" title="Encounter">
      <div className="space-y-5">
        <TrackedLink
          href="/"
          eventName="poc_back_to_dashboard_clicked"
          eventProperties={{ encounterId: encounter.id }}
          className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
        >
          Back to dashboard
        </TrackedLink>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Encounter Details
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Encounter ID</dt>
                <dd className="font-medium text-slate-800">{encounter.id}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Start Date</dt>
                <dd className="font-medium text-slate-800">
                  {formatDateTime(encounter.startDt)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd className="font-medium text-slate-800">{encounter.status}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Summary</dt>
                <dd className="font-medium text-slate-800">{encounter.details}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              Patient Info
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Name</dt>
                <dd className="font-medium text-slate-800">
                  {encounter.patientName}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Age</dt>
                <dd className="font-medium text-slate-800">
                  {encounter.patient.age}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Weight</dt>
                <dd className="font-medium text-slate-800">
                  {encounter.patient.weightKg} kg
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">From</dt>
                <dd className="font-medium text-slate-800">
                  {encounter.patient.from}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Gender</dt>
                <dd className="font-medium text-slate-800">
                  {encounter.patient.gender}
                </dd>
              </div>
            </dl>
          </article>
        </section>
      </div>
    </AppShell>
  );
}
