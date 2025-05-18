"use server";
import { BellIcon, CalendarIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import {  getContractsByProviderId } from "@/actions/contract";
import { ContractStates } from "@/lib/definitions";
import ContractCard from "./contract-card";




async function DashboardContracts() {
  const res = await getContractsByProviderId();
  console.log(res);
  

  const pendingContracts = res.filter(
    (contract) => contract.estado?.estado_id === ContractStates.PENDING
  );
  const contracts = res.filter(
    (contract) => contract.estado?.estado_id !== ContractStates.PENDING
  );

  return (
    <Card className="mb-8">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Mis Contratos</CardTitle>
      </CardHeader>
      <CardContent>
        {res.length === 0 ? (
          <div className="text-center p-10 text-gray-500">
            <UserIcon className="mx-auto h-16 w-16 mb-4 text-gray-400" />
            <p className="text-lg font-medium mb-2">Todavía no hay contratos</p>
            <p className="text-sm max-w-md mx-auto">
              Cuando tengas contratos programados o peticiones de servicio,
              aparecerán aquí.
            </p>
          </div>
        ) : (
          <>
            {/* Peticiones de servicio */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3 flex items-center">
                <BellIcon className="mr-2 h-5 w-5 text-blue-500" />
                Peticiones de servicio
              </h3>
              <Carousel className="w-full relative">
                <CarouselContent>
                  {pendingContracts.length === 0 ? (
                    <div className="text-center w-full py-8 text-gray-500">
                      No tienes peticiones de servicio pendientes.
                    </div>
                  ) : (
                    pendingContracts.map((pendingContract) => (
                      <ContractCard key={pendingContract.contrato_id} contract={pendingContract} />
                    ))
                  )}
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
                {contracts.length === 0 ? (
                  <div className="text-center w-full py-8 text-gray-500">
                    No tienes contratos confirmados.
                  </div>
                ) : (
                  contracts.map((contract) => (
                    <ContractCard key={contract.contrato_id} contract={contract} />
                  ))
                )}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-2" />
              <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-2" />
            </Carousel>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardContracts;

