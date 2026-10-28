// CONTEXT: existing code, not part of the PR. Fake data and auth so the app runs locally.
export type Year = "yr1" | "yr2" | "yr3";
export type Row = { key: string; label: string; yr1: string; yr2: string; yr3: string };
export type Version = { version: number; rows: Row[]; customRows: Row[] };
export type Offer = { id: string; ownerId: string; versions: Version[] };
export type User = { id: string; isAdmin: boolean };
const row = (key: string, label: string, yr1 = "", yr2 = "", yr3 = ""): Row => ({ key, label, yr1, yr2, yr3 });
const offers: Record<string, Offer> = {
  "101": {
    id: "101",
    ownerId: "u1",
    versions: [
      { version: 1, rows: [row("signing", "Signing bonus", "10000"), row("marketing", "Marketing budget", "2500", "2500", "2500")], customRows: [] },
      { version: 2, rows: [row("signing", "Signing bonus", "15000"), row("marketing", "Marketing budget", "3000", "3000", "3000")], customRows: [row("c1", "Photography package", "1800", "900")] },
    ],
  },
  "102": {
    id: "102",
    ownerId: "u2",
    versions: [{ version: 1, rows: [row("signing", "Signing bonus", "20000"), row("marketing", "Marketing budget", "5000")], customRows: [] }],
  },
};
// Locally you are always recruiter u1, who owns offer 101 but not 102.
export const getUser = async (): Promise<User> => ({ id: "u1", isAdmin: false });
export const canEdit = (user: User, offer: Offer) => user.isAdmin || offer.ownerId === user.id;
export const getOffer = async (id: string): Promise<Offer | null> => offers[id] ?? null;
// Every save adds a new version; earlier versions are kept.
export async function addVersion(offerId: string, rows: Row[], customRows: Row[]) {
  const offer = offers[offerId];
  offer.versions.push({ version: offer.versions.length + 1, rows, customRows });
}
