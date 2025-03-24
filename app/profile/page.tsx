import ProfilePage from "@/components/profile/profile-page";
import { ProfileFormProviderSkeleton } from "@/components/skeletons/profile-form-provider-skeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<ProfileFormProviderSkeleton />}>
        <ProfilePage />
      </Suspense>
    </div>
  );
}
