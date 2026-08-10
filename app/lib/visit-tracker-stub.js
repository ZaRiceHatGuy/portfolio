"use client";

// Deploy-build fallback: app/admin is gitignored, so this no-op stands in for
// the real VisitTracker on git-based deploys. Locally, next.config.mjs aliases
// @admin/VisitTracker to the real component so dev keeps counting visits.
export default function VisitTrackerStub() {
  return null;
}
