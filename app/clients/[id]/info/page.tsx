import { Suspense } from "react";
import ClientInfo from "@/components/info/client-info";
import ClientInfoSkeleton from "@/components/skeletons/client-info-skeleton";

type ClientInfoProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: ClientInfoProps) {
  const id = (await params).id;

  return (
    <Suspense fallback={<ClientInfoSkeleton />}>
      <ClientInfo id={Number(id)} />
    </Suspense>
  );
}
