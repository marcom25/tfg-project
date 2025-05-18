import AgreementInfo from "@/components/agreement/agreement-info";
import React, { Suspense } from "react";


type AgreementInfoProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: AgreementInfoProps) {
  const id = (await params).id
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgreementInfo contractId={Number(id)} />
    </Suspense>
  );
}
