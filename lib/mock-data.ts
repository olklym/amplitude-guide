import { promises as fs } from "node:fs";
import path from "node:path";
import seedEncounters from "@/lib/encounters.json";

export type Encounter = {
  id: string;
  patientName: string;
  startDt: string;
  status: "Completed" | "In Progress" | "Scheduled";
  details: string;
  patient: {
    age: number;
    weightKg: number;
    from: string;
    gender: "Female" | "Male" | "Other";
  };
};

const seedData: Encounter[] = seedEncounters as Encounter[];
const encountersFilePath = path.join(process.cwd(), "lib", "encounters.json");

declare global {
  var __amplitudeGuideEncounters: Encounter[] | undefined;
  var __amplitudeGuideEncounterStorePromise: Promise<Encounter[]> | undefined;
}

async function writeEncounterStore(items: Encounter[]) {
  await fs.writeFile(encountersFilePath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
}

async function ensureEncounterStore() {
  if (globalThis.__amplitudeGuideEncounters) {
    return globalThis.__amplitudeGuideEncounters;
  }

  if (!globalThis.__amplitudeGuideEncounterStorePromise) {
    globalThis.__amplitudeGuideEncounterStorePromise = (async () => {
      try {
        const fileContent = await fs.readFile(encountersFilePath, "utf8");
        const parsed = JSON.parse(fileContent) as Encounter[];
        globalThis.__amplitudeGuideEncounters = Array.isArray(parsed)
          ? parsed
          : [...seedData];
      } catch {
        globalThis.__amplitudeGuideEncounters = [...seedData];
        await writeEncounterStore(globalThis.__amplitudeGuideEncounters);
      }

      return globalThis.__amplitudeGuideEncounters;
    })();
  }

  return globalThis.__amplitudeGuideEncounterStorePromise;
}

const firstNames = [
  "Olivia",
  "Ethan",
  "Sophia",
  "Lucas",
  "Amelia",
  "Mason",
  "Charlotte",
  "James",
];

const lastNames = [
  "Walker",
  "Reed",
  "Nguyen",
  "Brooks",
  "Sullivan",
  "Parker",
  "Rivera",
  "Foster",
];

const cities = [
  "Denver, CO",
  "Chicago, IL",
  "Miami, FL",
  "Portland, OR",
  "Phoenix, AZ",
  "Nashville, TN",
];

const detailsPool = [
  "Initial visit for fatigue and sleep concerns.",
  "Follow-up for medication adjustment and symptom review.",
  "Scheduled annual wellness check and preventive screening.",
  "Consultation for persistent knee discomfort.",
  "Care plan update after lab result discussion.",
];

const statuses: Encounter["status"][] = [
  "Completed",
  "In Progress",
  "Scheduled",
];

function randomItem<T>(items: T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

function nextEncounterId(items: Encounter[]) {
  const maxId = items.reduce((max, encounter) => {
    const value = Number.parseInt(encounter.id.replace("enc-", ""), 10);
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 1000);

  return `enc-${maxId + 1}`;
}

function randomPatientName() {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

export async function createEncounterWithRandomDefaults(
  overrides?: Partial<Pick<Encounter, "patientName" | "status" | "details">>,
) {
  const encounters = await ensureEncounterStore();
  const encounter: Encounter = {
    id: nextEncounterId(encounters),
    patientName: overrides?.patientName?.trim() || randomPatientName(),
    startDt: new Date().toISOString(),
    status: overrides?.status || randomItem(statuses),
    details: overrides?.details?.trim() || randomItem(detailsPool),
    patient: {
      age: Math.floor(Math.random() * 55) + 20,
      weightKg: Math.floor(Math.random() * 50) + 50,
      from: randomItem(cities),
      gender: randomItem<Encounter["patient"]["gender"]>([
        "Female",
        "Male",
        "Other",
      ]),
    },
  };

  encounters.unshift(encounter);
  await writeEncounterStore(encounters);
  return encounter;
}

export async function getEncounterById(id: string) {
  const encounters = await ensureEncounterStore();
  return encounters.find((encounter) => encounter.id === id);
}

export async function getEncounters() {
  return ensureEncounterStore();
}
