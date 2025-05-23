
import { getProvinces } from "@/actions/location"
import { getProviderInfo } from "@/actions/provider"
import ReservationForm from "@/components/agreement/create-reserve-form"


type ProviderReserveProps = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: ProviderReserveProps) {
  const id = (await params).id;

  const provinces = await getProvinces()
  const provider = await getProviderInfo(Number(id))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reserva tu servicio de cuidado</h1>
      <ReservationForm id={id} provinces={provinces} providerName={`${provider.usuario.nombre} ${provider.usuario.apellido}`} />
    </div>
  )
}

