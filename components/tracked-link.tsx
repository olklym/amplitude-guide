"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackEvent } from "@/lib/amplitude-client";

type TrackedLinkProps = {
  href: string;
  eventName: string;
  eventProperties?: Record<string, unknown>;
  className?: string;
  children: ReactNode;
};

export function TrackedLink({
  href,
  eventName,
  eventProperties,
  className,
  children,
}: TrackedLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => trackEvent(eventName, eventProperties)}
      className={className}
    >
      {children}
    </Link>
  );
}
