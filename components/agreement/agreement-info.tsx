import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  User,
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MessageSquare,
  FileText,
  AlertCircle,
  RotateCcw,
  CheckCircle2,
  CircleXIcon as XCircle2,
} from "lucide-react";
import {
  getDecisionMessage,
  getStateMessage,
  getVariantFromDecisionState,
  getVariantFromState,
  normalizeText,
} from "@/lib/utils";
import { getConctractById } from "@/actions/contract";
import { DecisionStates } from "@/lib/definitions";
import { auth } from "@/auth";
import AgreementActions from "./agreement-actions";

export function getStateIcon(state: string | undefined): JSX.Element | null {
  switch (state) {
    case "PENDING":
      return <AlertCircle className="h-5 w-5 " />;
    case "ON_GOING":
      return <Clock className="h-5 w-5 " />;
    case "REJECTED":
      return <XCircle2 className="h-5 w-5 " />;
    case "FINISHED":
      return <CheckCircle2 className="h-5 w-5" />;
    case "ACCEPTED":
      return <CheckCircle2 className="h-5 w-5" />;
    default:
      return null; // Si no hay un estado válido, no devuelve nada
  }
}

export function getDecisionIcon(
  state: string | undefined | null
): JSX.Element | null {
  switch (state) {
    case DecisionStates.ACCEPTED:
      return <CheckCircle className="h-5 w-5" />;
    case DecisionStates.REJECTED:
      return <XCircle className="h-5 w-5" />;
    case DecisionStates.PENDING:
      return <AlertCircle className="h-5 w-5" />;
    default:
      return null; // Si no hay un estado válido, no devuelve nada
  }
}

export default async function AgreementInfo({
  contractId,
}: {
  contractId: number;
}) {
  const contract = await getConctractById(contractId);
  const session = await auth();
  const userRole = session?.user.role;
  // Función para formatear fechas
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getMyDecision = () => {
    if (session?.user.role === "CLIENT") {
      return contract?.decision_cliente;
    } else if (session?.user.role === "PROVIDER") {
      return contract?.decision_proveedor;
    }
  };

  // Función para formatear números
  const formatNumber = (value: string | number) => {
    return new Intl.NumberFormat("es-AR").format(Number(value));
  };

  const agreementStatus = contract?.estado?.estado;

  const getUrlToRedirect = () => {
    if (session?.user.role === "CLIENT") {
      return `/chat/redirect?providerId=${contract?.proveedor_id}`;
    } else if (session?.user.role === "PROVIDER") {
      return `/chat/redirect?clientId=${contract?.cliente_id}`;
    }
    return "";
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="px-4 py-6 sm:px-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Resumen del Acuerdo
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2 border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl text-blue-700">
                Detalles del Servicio
              </CardTitle>
              <CardDescription>
                Información acordada entre {contract?.cliente.usuario.nombre} y{" "}
                {contract?.proveedor.usuario.nombre}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Cliente</p>
                    <p className="font-medium">
                      {contract?.cliente.usuario.nombre}{" "}
                      {contract?.cliente.usuario.apellido}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Cuidador</p>
                    <p className="font-medium">
                      {contract?.proveedor.usuario.nombre}{" "}
                      {contract?.proveedor.usuario.apellido}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha Inicio</p>
                    <p className="font-medium">
                      {contract ? formatDate(contract.fecha_inicio) : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Fecha Fin</p>
                    <p className="font-medium">
                      {contract?.fecha_fin
                        ? formatDate(contract.fecha_fin)
                        : "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Duración</p>
                    <p className="font-medium">
                      {contract?.cantidad_horas} horas
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Rango monetario</p>
                    <p className="font-medium">
                      {contract?.rango_cliente
                        ? `$${formatNumber(
                            contract.rango_cliente.minimo?.toNumber() || 0
                          )} - $${formatNumber(
                            contract.rango_cliente.maximo?.toNumber() || 0
                          )}`
                        : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 col-span-full">
                  <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium">
                      {contract?.direccion
                        ? `${contract.direccion.calle} ${contract.direccion.numero}, `
                        : "N/A"}
                      {contract?.direccion?.ciudad?.nombre || "N/A"}
                      {", "}
                      {normalizeText(
                        contract?.direccion?.ciudad?.provincia?.nombre || "N/A"
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 col-span-full">
                  <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">
                      Requisitos especiales
                    </p>
                    <p className="font-medium">
                      {contract?.detalles && contract.detalles.trim() !== ""
                        ? contract.detalles
                        : "No hay requisitos especiales"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-blue-500 shadow-md h-full flex flex-col">
            <CardHeader className="pb-2 flex ">
              <CardTitle className="text-xl font-bold text-blue-600">
                Estado del Acuerdo
              </CardTitle>
              <Badge
                variant={getVariantFromState(agreementStatus)}
                className="text-sm py-1.5 px-3 justify-center gap-1"
              >
                {getStateIcon(agreementStatus)}
                {`Acuerdo ${getStateMessage(agreementStatus)}`}
              </Badge>
            </CardHeader>
            <CardContent className="pt-6 pb-6 flex-grow">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Cliente:</span>
                  </div>
                  <Badge
                    variant={getVariantFromDecisionState(
                      contract?.decision_cliente
                    )}
                    className="px-4 py-1.5 text-sm gap-1"
                  >
                    {getDecisionIcon(contract?.decision_cliente)}
                    {getDecisionMessage(contract?.decision_cliente)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Cuidador:</span>
                  </div>
                  <Badge
                    variant={getVariantFromDecisionState(
                      contract?.decision_proveedor
                    )}
                    className="px-4 py-1.5 text-sm gap-1"
                  >
                    {getDecisionIcon(contract?.decision_proveedor)}
                    {getDecisionMessage(contract?.decision_proveedor)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 w-[50%]">
                    <DollarSign className="h-5 w-5 text-gray-500" />
                    <span className="font-medium text-md">Monto acordado:</span>
                  </div>
                  <div className="text-right text-md">
                    {contract?.monto_acordado
                      ? `$${formatNumber(contract.monto_acordado.toNumber())}`
                      : "Monto no acordado."}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4 mt-auto">
              <AgreementActions
                myDecision={getMyDecision()}
                contractId={contractId}
                contractState={agreementStatus}
                amountAgreed={contract?.monto_acordado?.toNumber()}
                userRole={userRole}
                minRange={contract?.rango_cliente?.minimo?.toNumber() || 0}
                maxRange={contract?.rango_cliente?.maximo?.toNumber() || 0}
                urlToRedirect={getUrlToRedirect()}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

