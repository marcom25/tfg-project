// import { fetchProvincesAndCities, fetchUserData } from "@/lib/data";
import { getProvinces } from "@/actions/location";
import ProfileForm from "./profile-form-provider";
import { getProviderInfoFromUserId } from "@/actions/provider";
import { auth } from "@/auth";
import ProfileFormProvider from "./profile-form-provider";
import ProfileFormClient from "./profile-form-client";
import { getClientInfoFromUserId } from "@/actions/client";

export default async function ProfilePage() {
  const session = await auth();
  const provincesAndCities = await getProvinces();
  if (session?.user.role === "CLIENT") {
    const userData = await getClientInfoFromUserId(Number(session?.user.id));
    return (
      <ProfileFormClient
        userData={userData}
        provincesAndCities={provincesAndCities}
      />
    );
  }

  const userData = await getProviderInfoFromUserId(Number(session?.user.id));
  return (
    <ProfileFormProvider
      userData={userData}
      provincesAndCities={provincesAndCities}
    />
  );
}
