# Architecture rules
- Store donation options as an ordered array in the existing page content JSON, with a shared legacy-field reader and validator; this keeps admin and public values consistent without a schema change.
- Public page reads are restricted to the portal's supported institutional slugs; admin/editor reads remain role-scoped so future internal pages are private by default.
- Memorial ratings accept only 1–5 and browser UUIDs; public reads use aggregate statistics or exact-UUID rating lookup, never raw-table listing, to avoid exposing visitor identifiers.
- E-book purchase entry points share a Checkout helper that reserves a separate tab synchronously before requesting the session; embedded blogs must never navigate their frame to Stripe Checkout.