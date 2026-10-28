# Offer Builder: Incentives step

Recruiters use the Offer Builder to put together a joining offer for a real estate agent. This PR adds the **Incentives** step: dollar amounts paid to the agent in each of their first three years.

**Rules**

- Amounts are US dollars.
- The Total includes every row, including custom rows.
- Each save creates a new version. Earlier versions stay viewable.
- Recruiters can edit only the offers they own.
- The projection comes from a paid third-party API. It isn't reachable locally, so it shows "—".

**Files**

| Gist file | Path in your app | |
|---|---|---|
| `1-page.tsx` | `app/offers/[id]/incentives/page.tsx` | In the PR |
| `2-incentives-form.tsx` | `app/offers/[id]/incentives/incentives-form.tsx` | In the PR |
| `3-offers.ts` | `lib/offers.ts` | Existing code, for context only |

**Running it (Part 2 only)**

1. Create a Next.js app (Node 20+):
   `npx create-next-app@latest offer-builder --ts --app --tailwind --eslint --no-src-dir --import-alias "@/*" --use-npm --yes`
2. Copy the three files to the paths above (drop the number from each name).
3. Run `npm run dev` and open http://localhost:3000/offers/101/incentives.
