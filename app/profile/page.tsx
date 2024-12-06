import ProfileForm from "@/components/profile/profile-form";
import { fetchProvincesAndCities, fetchUserData } from "@/lib/data";
import { Suspense } from "react";

export default async function Page() {
  const userData = await fetchUserData()
  const provincesAndCities = await fetchProvincesAndCities()

  return (
    <div className="container mx-auto p-4">
      <Suspense fallback={<div>Cargando...</div>}>
        <ProfileForm
          userData={userData}
          provincesAndCities={provincesAndCities}
        />
      </Suspense>
    </div>
  );
}
