import { Suspense } from "react";
import ProviderInfo from "@/components/info/provider-info";
import ProviderInfoSkeleton from "@/components/skeletons/provider-info-skeleton";

type ProviderInfoProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: ProviderInfoProps) {
  const id = (await params).id;

  return (
    <Suspense fallback={<ProviderInfoSkeleton />}>
      <ProviderInfo id={Number(id)} />
    </Suspense>
  );
}
