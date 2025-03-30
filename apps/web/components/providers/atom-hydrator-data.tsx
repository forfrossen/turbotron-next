"use server";

import AtomHydrator, { AtomHydratorProps } from "@repo/web/components/providers/atom-hydrator";

export async function SsDataFetcher() {
  const data: AtomHydratorProps = {};
  return <AtomHydrator {...data} />;
}

export default async function AtomHydratorData() {
  return <SsDataFetcher />;
}
