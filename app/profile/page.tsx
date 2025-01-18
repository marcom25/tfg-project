import ProfilePage from "@/components/profile/profile-page";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <ProfilePage />
      </Suspense>
    </div>
  );
}
