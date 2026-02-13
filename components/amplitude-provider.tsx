"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initAmplitude, trackEvent } from "@/lib/amplitude-client";

export function AmplitudeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    initAmplitude();
  }, []);

  useEffect(() => {
    trackEvent("poc_page_view", {
      pathname,
    });
  }, [pathname]);

  return children;
}
