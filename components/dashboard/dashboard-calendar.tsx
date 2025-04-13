"use client";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import React, { useState, useEffect, useCallback, useMemo } from "react";

import { format } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  getContractsByDateRange,
  getContractsByProivderId,
} from "@/actions/contract";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "../ui/badge";
import { DashboardCalendarSkeleton } from "../skeletons/dashboard-calendar-skeleton";
import { useDebouncedCallback } from "use-debounce";
import Link from "next/link";

type GetContractsByDateRange = Awaited<
  ReturnType<typeof getContractsByDateRange>
>;

const DashboardCalendar = React.memo(() => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [showModal, setShowModal] = useState(false);
  const [contratosForDate, setContratosForDate] =
    useState<GetContractsByDateRange>([]);
  const [contractsLength, setContractsLength] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalLoading, setIsModalLoading] = useState(false);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const contratos = await getContractsByProivderId();
        setContractsLength(contratos.length);
      } catch (error) {
        console.error("Error fetching contracts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const handleDateClick = useDebouncedCallback(
    async (selectedDate: Date | undefined) => {
      if (selectedDate) {
        setSelectedDate(selectedDate);
        setIsModalLoading(true);
        try {
          const contratos = await getContractsByDateRange(selectedDate);
          setContratosForDate(contratos as GetContractsByDateRange);
        } catch (error) {
          console.error("Error fetching contracts:", error);
          setContratosForDate([]);
        } finally {
          setIsModalLoading(false);
        }

        setShowModal(true);
      }
    },
    300
  );

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedDate(undefined);
  }, []);

  const calendarDisabledDates = useMemo(
    () => (date: Date) => date.getTime() < new Date().setHours(0, 0, 0, 0),
    []
  );

  if (showModal && isModalLoading) {
    return <DashboardCalendarSkeleton />;
  }

  return (
    <>
      <Card className="flex-shrink-0 w-full md:w-1/5 flex flex-col">
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex items-center justify-center">
          {contractsLength ? (
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateClick}
              className="w-full"
              components={{
                DayContent: (props: { date: Date }) => (
                  <div
                    className={`relative h-full w-full flex items-center justify-center ${
                      selectedDate?.toDateString() === props.date.toDateString()
                        ? "bg-black text-white"
                        : ""
                    }`}
                  >
                    {props.date.getDate()}
                  </div>
                ),
              }}
              disabled={calendarDisabledDates}
            />
          ) : (
            <div className="text-center p-6 text-gray-500">
              <CalendarIcon className="mx-auto h-12 w-12 mb-2 text-gray-400" />
              <p>No hay contratos programados</p>
            </div>
          )}
        </CardContent>
      </Card>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-lg font-bold mb-4">
              Contratos para{" "}
              {selectedDate &&
                format(selectedDate, "EEEE dd 'de' MMMM yyyy", { locale: es })}
            </h2>
            {contratosForDate.length > 0 ? (
              <ul className="space-y-2">
                {contratosForDate.map((contract) => (
                  <Link
                    key={contract.contrato_id}
                    href={`/contracts/${contract.contrato_id}`}
                  >
                    <li
                      className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-slate-50 transition-colors `}
                    >
                      <Avatar className="h-12 w-12 border-2 border-primary rounded-full overflow-hidden">
                        <AvatarImage
                          src={contract.cliente.usuario.imagen_perfil_id ?? ""}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {`${contract.cliente.usuario.nombre?.[0]}${contract.cliente.usuario.apellido?.[0]}`}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <p className="font-medium">
                          {contract.cliente.usuario.nombre}{" "}
                          {contract.cliente.usuario.apellido}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <CalendarIcon className="h-3 w-3" />
                          {format(contract.fecha_inicio, "dd/MM/yyyy", {
                            locale: es,
                          })}{" "}
                          - <ClockIcon className="h-3 w-3 ml-1" />{" "}
                          {contract.cantidad_horas} horas
                        </p>
                      </div>

                      {contract.cliente.servicios.slice(0, 1).map((service) => (
                        <Badge key={service.nombre_servicio} variant="default">
                          {service.nombre_servicio}
                        </Badge>
                      ))}
                      {contract.cliente.servicios.length > 1 && (
                        <Badge variant="default" className="text-xs">
                          +{contract.cliente.servicios.length - 1}
                        </Badge>
                      )}
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay contratos para esta fecha.</p>
            )}
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
});

DashboardCalendar.displayName = "DashboardCalendar";

export default DashboardCalendar;

