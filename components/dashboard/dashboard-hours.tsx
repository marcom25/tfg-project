import { Calendar, ClockIcon, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  calculateMonthlyHoursByProviderId,
  calculateWeeklyAverageHoursByProviderId,
  calculateWeeklyHoursByProviderId,
} from "@/actions/contract";

async function DashboardHours() {
  const weeklyHours = await calculateWeeklyHoursByProviderId();
  const monthlyHours = await calculateMonthlyHoursByProviderId();
  const weeklyAverageHours = await calculateWeeklyAverageHoursByProviderId();
  
  return (
    <Card className="flex-grow w-full md:w-1/4 flex flex-col">
      <CardHeader>
        <CardTitle>Horas</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center">
        {weeklyHours && monthlyHours && weeklyAverageHours ? (
          <div className="grid grid-cols-1 gap-4 w-full">
            <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50/50 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-purple-700">
                  <ClockIcon className="mr-2 h-5 w-5 text-purple-500" />
                  Este mes
                </span>
                <span className="text-xl font-bold text-purple-700">
                  {monthlyHours} horas
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50/50 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-blue-700">
                  <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                  Esta semana
                </span>
                <span className="text-xl font-bold text-blue-700">
                  {weeklyHours} horas
                </span>
              </div>
            </div>
            <div className="p-4 rounded-lg border-2 border-yellow-500 bg-yellow-50/50 w-full">
              <div className="flex items-center justify-between">
                <span className="flex items-center font-medium text-yellow-700">
                  <TrendingUp className="mr-2 h-5 w-5 text-yellow-500" />
                  Promedio semanal
                </span>
                <span className="text-xl font-bold text-yellow-700">
                  {weeklyAverageHours} horas
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center p-6 text-gray-500">
            <ClockIcon className="mx-auto h-12 w-12 mb-2 text-gray-400" />
            <p>No hay datos de horas disponibles</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default DashboardHours;

