"use client";

import * as amplitude from "@amplitude/analytics-browser";
import { plugin as engagementPlugin } from "@amplitude/engagement-browser";

const AMPLITUDE_API_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_API_KEY;
const AMPLITUDE_SERVER_ZONE = process.env.NEXT_PUBLIC_AMPLITUDE_SERVER_ZONE;
const POC_USER_ID = process.env.NEXT_PUBLIC_POC_USER_ID ?? "poc-user-olivia";

let isInitialized = false;

function resolveServerZone() {
  if (AMPLITUDE_SERVER_ZONE === "EU") {
    return "EU" as const;
  }

  if (AMPLITUDE_SERVER_ZONE === "local") {
    return "local" as const;
  }

  return "US" as const;
}

export function initAmplitude() {
  if (isInitialized || !AMPLITUDE_API_KEY || typeof window === "undefined") {
    return false;
  }

  amplitude.add(
    engagementPlugin({
      serverZone: resolveServerZone(),
    }),
  );

  amplitude.init(AMPLITUDE_API_KEY, POC_USER_ID, {
    defaultTracking: {
      sessions: true,
      pageViews: false,
      formInteractions: false,
      fileDownloads: false,
    },
  });

  amplitude.track("poc_sdk_initialized", {
    source: "amplitude-guide-poc",
  });

  isInitialized = true;
  return true;
}

export function trackEvent(eventName: string, eventProperties?: Record<string, unknown>) {
  if (!isInitialized) {
    return;
  }

  amplitude.track(eventName, eventProperties);
}

export function showGuide(flagKey: string, step = 0) {
  if (!isInitialized || typeof window === "undefined" || !window.engagement) {
    return false;
  }

  window.engagement.gs.show(flagKey, step);
  return true;
}

export function openResourceCenter() {
  if (!isInitialized || typeof window === "undefined" || !window.engagement) {
    return false;
  }

  window.engagement.rc.open();
  return true;
}

export async function refreshGuides() {
  if (!isInitialized || typeof window === "undefined" || !window.engagement) {
    return false;
  }

  await window.engagement.refresh();
  return true;
}

export function listActiveGuides() {
  if (!isInitialized || typeof window === "undefined" || !window.engagement) {
    return [];
  }

  return window.engagement.gs.list();
}
