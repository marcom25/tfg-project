import { ContractCarousel } from "./contract-carousel"

async function HomePageClient() {
  return (
    <div className="pb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Mis Reservas</h2>
      <ContractCarousel />
    </div>
  )
}

export default HomePageClient

