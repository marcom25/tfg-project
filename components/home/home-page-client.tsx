import { ContractCarousel } from "./contract-carousel"
import { getProviders } from "@/actions/provider"

async function HomePageClient() {
//   const providers = await getProviders()

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Mis Reservas</h2>
      <ContractCarousel  />
    </div>
  )
}

export default HomePageClient

