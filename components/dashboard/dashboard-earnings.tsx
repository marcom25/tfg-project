import { calculateEarningnsByProviderId } from "@/actions/contract";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CalendarIcon, DollarSignIcon, UserIcon } from "lucide-react";
import { formatNumber } from "@/lib/utils";

async function DashboardEarnings() {
  const earnings = await calculateEarningnsByProviderId();
  return (
    <Card className="flex-grow w-full md:w-1/4 flex flex-col">
      <CardHeader>
        <CardTitle>Ganancias</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        {earnings ? (
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="p-4 rounded-lg border-2 border-green-500 bg-green-50/50">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-green-700">
                  <DollarSignIcon className="mr-2 h-5 w-5 text-green-500" />
                  Total
                </span>
                <span className="text-xl font-bold text-green-700">
                  ${formatNumber(earnings.total.toString())}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-blue-700">
                  <CalendarIcon className="mr-2 h-5 w-5 text-blue-500" />
                  Este mes
                </span>
                <span className="text-xl font-bold text-blue-700">
                  ${formatNumber(earnings.monthly.toString())}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-lg border-2 border-yellow-500 bg-yellow-50/50">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-yellow-700">
                  <UserIcon className="mr-2 h-5 w-5 text-yellow-500" />
                  Pendiente
                </span>
                <span className="text-xl font-bold text-yellow-700">
                  ${formatNumber(earnings.pending.toString())}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 text-gray-500">
            <DollarSignIcon className="mx-auto h-12 w-12 mb-2 text-gray-400" />
            <p>No hay datos de ganancias disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardEarnings;

