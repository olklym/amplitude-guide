import type { Encounter } from "@/lib/mock-data";

export const CREATED_ENCOUNTERS_COOKIE = "amplitude-guide-created-encounters";
const MAX_CREATED_ENCOUNTERS = 25;

function isEncounter(value: unknown): value is Encounter {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<Encounter>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.patientName === "string" &&
    typeof candidate.startDt === "string" &&
    (candidate.status === "Completed" ||
      candidate.status === "In Progress" ||
      candidate.status === "Scheduled") &&
    typeof candidate.details === "string" &&
    !!candidate.patient &&
    typeof candidate.patient.age === "number" &&
    typeof candidate.patient.weightKg === "number" &&
    typeof candidate.patient.from === "string" &&
    (candidate.patient.gender === "Female" ||
      candidate.patient.gender === "Male" ||
      candidate.patient.gender === "Other")
  );
}

export function readCreatedEncountersFromCookie(
  cookieValue: string | undefined,
) {
  if (!cookieValue) {
    return [] as Encounter[];
  }

  try {
    const parsed = JSON.parse(cookieValue) as unknown;
    if (!Array.isArray(parsed)) {
      return [] as Encounter[];
    }

    return parsed.filter(isEncounter).slice(0, MAX_CREATED_ENCOUNTERS);
  } catch {
    return [] as Encounter[];
  }
}

export function upsertCreatedEncounters(
  existing: Encounter[],
  encounter: Encounter,
) {
  return [encounter, ...existing.filter((item) => item.id !== encounter.id)].slice(
    0,
    MAX_CREATED_ENCOUNTERS,
  );
}

export function mergeEncounters(
  seedEncounters: Encounter[],
  createdEncounters: Encounter[],
) {
  const result = [...createdEncounters];
  const seen = new Set(createdEncounters.map((encounter) => encounter.id));

  for (const encounter of seedEncounters) {
    if (!seen.has(encounter.id)) {
      result.push(encounter);
    }
  }

  return result;
}
