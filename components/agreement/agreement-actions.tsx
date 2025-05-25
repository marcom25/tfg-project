"use client";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { MessageSquare, RotateCcw } from "lucide-react";
import { DecisionStates } from "@/lib/definitions";
import { LoadingButton } from "../ui/loading-button";
import { useEffect, useState } from "react";
import {
  updateContractDecisionClient,
  updateContractDecisionProvider,
} from "@/actions/contract";
import { Roles } from "@/next-auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AgreementFormSchema, AgreementFormSchemaType } from "@/lib/schemas";
import { formatNumber, getStateMessage, unformatNumber } from "@/lib/utils";
import { redirectToConversation } from "@/actions/chat";
import Link from "next/link";

export default function AgreementActions({
  myDecision,
  contractId,
  userRole,
  minRange,
  maxRange,
  contractState,
  amountAgreed,
  urlToRedirect,
}: {
  myDecision: string | null | undefined;
  contractId: number;
  userRole: Roles | undefined;
  minRange: number;
  maxRange: number;
  contractState: string | undefined;
  amountAgreed: number | undefined;
  urlToRedirect: string;
}) {
  const [isLoadingAccept, setIsLoadingAccept] = useState(false);
  const [isLoadingPending, setIsLoadingPending] = useState(false);
  const [amount, setAmount] = useState<string>("");

  useEffect(() => {
    setAmount(formatNumber(amount));
  }, [amount]);

  const form = useForm<AgreementFormSchemaType>({
    resolver: zodResolver(AgreementFormSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const amountValue = form.watch("amount");

  async function onSubmit(data: AgreementFormSchemaType) {
    const isValid = await form.trigger();
    if (!isValid) {
      return;
    }
  }

  const handleAmountInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value;

    // Permitir solo dígitos, puntos y una sola coma
    inputValue = inputValue.replace(/[^\d.,]/g, "");

    // Asegurar que solo haya una coma
    const commaCount = (inputValue.match(/,/g) || []).length;
    if (commaCount > 1) {
      const parts = inputValue.split(",");
      inputValue = parts[0] + "," + parts.slice(1).join("");
    }

    // Formatear el valor para mostrar
    const formattedValue = formatNumber(inputValue);

    // Actualizar el estado del input
    setAmount(formattedValue);

    // Convertir a número y actualizar el formulario
    const numericValue = unformatNumber(formattedValue);
    form.setValue("amount", numericValue);
  };

  const isAmountValid =
    userRole !== "PROVIDER" ||
    (amount !== "" &&
      !isNaN(Number(unformatNumber(amount))) &&
      Number(unformatNumber(amount)) >= minRange &&
      Number(unformatNumber(amount)) <= maxRange);

  const handleAccept = async () => {
    setIsLoadingAccept(true);
    try {
      if (userRole === "CLIENT") {
        await updateContractDecisionClient(contractId, DecisionStates.ACCEPTED);
      } else if (userRole === "PROVIDER") {
        await updateContractDecisionProvider(
          contractId,
          DecisionStates.ACCEPTED,
          amountValue
        );
      }
    } catch (error) {
      console.error("Error al aceptar el acuerdo:", error);
    } finally {
      setIsLoadingAccept(false);
    }
  };

  const handleReject = async () => {
    try {
      if (userRole === "CLIENT") {
        await updateContractDecisionClient(contractId, DecisionStates.REJECTED);
      } else if (userRole === "PROVIDER") {
        await updateContractDecisionProvider(
          contractId,
          DecisionStates.REJECTED,
          amountValue
        );
      }
    } catch (error) {
      console.error("Error al rechazar el acuerdo:", error);
    }
  };

  const handleReset = async () => {
    setIsLoadingPending(true);
    try {
      if (userRole === "CLIENT") {
        await updateContractDecisionClient(contractId, DecisionStates.PENDING);
      } else if (userRole === "PROVIDER") {
        await updateContractDecisionProvider(
          contractId,
          DecisionStates.PENDING,
          amountValue
        );
      }
    } catch (error) {
      console.error("Error al volver a pendiente:", error);
    } finally {
      setIsLoadingPending(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {contractState !== "PENDING" && (
          <div className="w-full bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 p-4 rounded mb-4 flex items-center gap-2">
            <svg
              className="w-36 text-yellow-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <span>
              No se puede cambiar más la decisión porque el contrato está en
              estado <b>{getStateMessage(contractState)}</b>.
            </span>
          </div>
        )}
        {contractState === "PENDING" && (
          <>
            {!amountAgreed && userRole === "PROVIDER" && (
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-base font-medium">
                      Monto a acordar con el cliente
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                          $
                        </span>
                        <Input
                          type="text"
                          placeholder="Monto"
                          className="pl-7"
                          value={amount}
                          onChange={handleAmountInputChange}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex flex-col gap-3 w-full">
              {myDecision === DecisionStates.PENDING && (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="submit"
                        variant="destructive"
                        className="w-full py-5 text-base font-medium"
                        disabled={!isAmountValid}
                      >
                        Rechazar
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Al rechazar este acuerdo, se notificará al cliente y
                          se cancelará la negociación.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={handleReject}>
                          Confirmar rechazo
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <LoadingButton
                    className="w-full py-5 text-base font-medium bg-green-500 hover:bg-green-600 text-white"
                    onClick={handleAccept}
                    isLoading={isLoadingAccept}
                    labelButton="Aceptar"
                    loadingLabel="Procesando..."
                    type="submit"
                    disabled={!isAmountValid}
                  />
                </>
              )}

              {myDecision !== DecisionStates.PENDING && (
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <RotateCcw className="mr-2 h-3 w-3" />
                      <h3 className="font-medium">Tu respuesta</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {myDecision === DecisionStates.ACCEPTED
                        ? "Has aceptado este acuerdo. Cuando ambas partes acepten, se confirmará automáticamente."
                        : "Has rechazado este acuerdo. Puedes volver al estado pendiente si deseas reconsiderar."}
                    </p>
                    <LoadingButton
                      variant="outline"
                      size="sm"
                      className="w-full"
                      isLoading={isLoadingPending}
                      labelButton="Volver a pendiente"
                      loadingLabel="Procesando..."
                      onClick={handleReset}
                    />
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        <Button
          asChild
          variant="outline"
          className="w-full py-5 text-base border-blue-200 hover:bg-blue-50 hover:text-blue-700"
        >
          <Link href={urlToRedirect} className="flex items-center justify-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            Enviar Mensaje
          </Link>
        </Button>
      </form>
    </Form>
  );
}

