"use client"

import { BellIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Carousel, CarouselContent, CarouselNext, CarouselPrevious } from "../ui/carousel"
import ContractCardSkeleton from "./contract-card-skeleton"

function DashboardContractsSkeleton() {
  // Create arrays for the skeleton cards
  const pendingContractSkeletons = Array(3).fill(null)
  const confirmedContractSkeletons = Array(3).fill(null)

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Contratos</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Peticiones de servicio */}
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3 flex items-center">
            <BellIcon className="mr-2 h-5 w-5 text-blue-500" />
            Peticiones de servicio
          </h3>
          <Carousel className="w-full relative">
            <CarouselContent className="flex gap-4">
              {pendingContractSkeletons.map((_, index) => (
                <ContractCardSkeleton key={`pending-${index}`} />
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2" />
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2" />
          </Carousel>
        </div>

        <h3 className="text-lg font-medium mb-3 flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-green-500" />
          Contratos confirmados
        </h3>
        <Carousel className="w-full relative">
          <CarouselContent>
            {confirmedContractSkeletons.map((_, index) => (
              <ContractCardSkeleton key={`confirmed-${index}`} />
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2" />
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default DashboardContractsSkeleton
