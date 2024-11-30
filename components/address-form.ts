'use server'

import { getProvinciesWithCities } from "@/lib/data";

type AddressFormProps = {
  address: string;
  city: string;
  province: string;
};

export default async function AddresForm({
  address,
  city,
  province,
}: AddressFormProps): Promise<React.ReactNode> {
  const provincies = await getProvinciesWithCities();
  return (
    <>
    
    </>
  )
}
