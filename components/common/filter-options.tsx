"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon, Filter, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { provincia } from "@prisma/client";
import { getProvinces } from "@/actions/location";
import { normalizeText } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Filters {
  sortBy: string;
  location: string;
  minRating: string;
}

function FilterOptions() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);


  const [filters, setFilters] = useState<Filters>({
    sortBy: "nameAsc",
    location: "all",
    minRating: "0",
  });
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [locations, setLocations] = useState<provincia[]>([]);

  useEffect(() => {
    const getLocations = async () => {
      const locations = await getProvinces();     
      setLocations(locations);
    };
    getLocations();

    setFilters({
      sortBy: params.get("sortBy") || "nameAsc",
      location: params.get("location") || "all",
      minRating: params.get("minRating") || "0",
    })
    setFromDate(params.get("from") ? new Date(params.get("from") as string) : undefined);
    setToDate(params.get("to") ? new Date(params.get("to") as string) : undefined);


  }, []);

  // Sincronizar filtros con URL
  useEffect(() => {

    if (filters.sortBy !== "nameAsc") params.set("sortBy", filters.sortBy)
    else params.delete("sortBy");
    if (filters.location !== "all") params.set("location", filters.location);
    else params.delete("location");
    if (filters.minRating !== "0") params.set("minRating", filters.minRating);
    else params.delete("minRating");
    if (fromDate) params.set("from", format(fromDate, "yyyy-MM-dd"));
    else params.delete("from");
    if (toDate) params.set("to", format(toDate, "yyyy-MM-dd"));
    else params.delete("to");
    replace(`${pathname}?${params.toString()}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, fromDate, toDate]);

  const handleClearFilters = () => {
    setFilters({
      sortBy: "nameAsc",
      location: "all",
      minRating: "0",
    });
    setFromDate(undefined);
    setToDate(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="flex items-center gap-2">
          <Filter size={20} />
          Filtros
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          {/* Sección Ordenar por nombre */}
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Ordenar por nombre</h4>
            <div className="flex space-x-2">
              <Button
                variant={filters.sortBy === "nameAsc" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "nameAsc" }))
                }
              >
                A - Z
              </Button>
              <Button
                variant={filters.sortBy === "nameDesc" ? "default" : "outline"}
                size="sm"
                onClick={() =>
                  setFilters((prev) => ({ ...prev, sortBy: "nameDesc" }))
                }
              >
                Z - A
              </Button>
            </div>
          </div>

          {/* Sección Ubicación */}
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Ubicación</h4>
            <Select
              value={filters.location}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, location: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las ubicaciones</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location.provincia_id} value={location.nombre}>{normalizeText(location.nombre)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sección Puntuación */}
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Puntuación mínima</h4>
            <Select
              value={filters.minRating}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, minRating: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar puntuación" />
              </SelectTrigger>
              <SelectContent>
                {[0, 1, 2, 3, 4, 5].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {rating}+ estrellas
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sección Fechas */}
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Disponible</h4>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {fromDate ? format(fromDate, "PPP", { locale: es }) : "Desde"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={fromDate}
                  onSelect={setFromDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {toDate ? format(toDate, "PPP", { locale: es }) : "Hasta"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={toDate}
                  onSelect={setToDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Botón Limpiar */}
          <Button
            className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white"
            variant="destructive"
            onClick={handleClearFilters}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Limpiar filtros
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default FilterOptions;
