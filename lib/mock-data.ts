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

export const encounters: Encounter[] = [
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

export function getEncounterById(id: string) {
  return encounters.find((encounter) => encounter.id === id);
}
