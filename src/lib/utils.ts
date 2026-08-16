import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Base URL for shareable meeting links. Prefers NEXT_PUBLIC_BASE_URL, but falls
// back to the current origin so links stay correct if the env var is unset or
// still points at localhost in a deployed environment.
export function getBaseUrl() {
  const configured = process.env.NEXT_PUBLIC_BASE_URL

  if (typeof window !== "undefined") {
    if (!configured || configured.includes("localhost")) return window.location.origin
  }

  return configured ?? ""
}

export function getMeetingLink(meetingId?: string) {
  return `${getBaseUrl()}/meeting/${meetingId}`
}
