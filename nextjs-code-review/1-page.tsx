import Link from "next/link";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { addVersion, canEdit, getOffer, getUser, type Row } from "@/lib/offers";

import { IncentivesForm } from "./incentives-form";

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ v?: string }> };

export default async function IncentivesPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { v } = await searchParams;
  const user = await getUser();
  const offer = await getOffer(id);
  if (!offer || !canEdit(user, offer)) notFound();

  const selected = offer.versions.find((x) => String(x.version) === v) ?? offer.versions.at(-1)!;

  async function save(offerId: string, rows: Row[], customRows: Row[]) {
    "use server";
    await addVersion(offerId, rows, customRows);
    revalidatePath(`/offers/${offerId}/incentives`);
  }

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-8">
      <nav className="flex gap-3 text-sm">
        {offer.versions.map((x) => (
          <Link key={x.version} href={`?v=${x.version}`}>
            Version {x.version}
          </Link>
        ))}
      </nav>
      <IncentivesForm offerId={offer.id} initial={selected} save={save} />
    </main>
  );
}
