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

const initialEncounters: Encounter[] = [
  {
    id: "enc-1001",
    patientName: "Ava Thompson",
    startDt: "2026-02-11T09:15:00Z",
    status: "Completed",
    details: "Routine follow-up for blood pressure management.",
    patient: {
      age: 32,
      weightKg: 61,
      from: "Boston, MA",
      gender: "Female",
    },
  },
  {
    id: "enc-1002",
    patientName: "Noah Martinez",
    startDt: "2026-02-12T13:45:00Z",
    status: "In Progress",
    details: "Initial consultation for lower back pain.",
    patient: {
      age: 44,
      weightKg: 84,
      from: "Austin, TX",
      gender: "Male",
    },
  },
  {
    id: "enc-1003",
    patientName: "Mia Patel",
    startDt: "2026-02-14T08:30:00Z",
    status: "Scheduled",
    details: "Nutrition and lifestyle counseling session.",
    patient: {
      age: 27,
      weightKg: 58,
      from: "Seattle, WA",
      gender: "Female",
    },
  },
  {
    id: "enc-1004",
    patientName: "Liam Chen",
    startDt: "2026-02-15T11:00:00Z",
    status: "Scheduled",
    details: "Review of lab results and treatment adjustment.",
    patient: {
      age: 51,
      weightKg: 77,
      from: "San Jose, CA",
      gender: "Male",
    },
  },
];

declare global {
  var __amplitudeGuideEncounters: Encounter[] | undefined;
}

function getEncounterStore() {
  if (!globalThis.__amplitudeGuideEncounters) {
    // Clone seed data once so we can mutate safely at runtime.
    globalThis.__amplitudeGuideEncounters = [...initialEncounters];
  }

  return globalThis.__amplitudeGuideEncounters;
}

export const encounters: Encounter[] = getEncounterStore();

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

function nextEncounterId() {
  const maxId = encounters.reduce((max, encounter) => {
    const value = Number.parseInt(encounter.id.replace("enc-", ""), 10);
    return Number.isNaN(value) ? max : Math.max(max, value);
  }, 1000);

  return `enc-${maxId + 1}`;
}

function randomPatientName() {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

export function createEncounterWithRandomDefaults(
  overrides?: Partial<Pick<Encounter, "patientName" | "status" | "details">>,
) {
  const encounter: Encounter = {
    id: nextEncounterId(),
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
  return encounter;
}

export function getEncounterById(id: string) {
  return encounters.find((encounter) => encounter.id === id);
}
