"use client";

import { StarIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { CommentFormSchema, CommentFormSchemaType } from "@/lib/schemas";
import { checkCommentPermission, submitCommentForProvider } from "@/actions/comment";

function CommentSection({ providerId }: { providerId: number }) {
  const [loading, setLoading] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const form = useForm<CommentFormSchemaType>({
    resolver: zodResolver(CommentFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const [selectedRating, setSelectedRating] = useState(0);
  const ratingValue = form.watch("rating");

  const handleStarClick = (value: number) => {
    setSelectedRating(value);
    form.setValue("rating", value);
  };

  async function onSubmit(data: CommentFormSchemaType) {
    setLoading(true);
    try {
      // Aquí iría tu server action para enviar el comentario
      await submitCommentForProvider(data, providerId);
      form.reset();
      setSelectedRating(0);
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const checkPermission = async () => {
      const result = await checkCommentPermission(providerId, "provider");
      setIsAllowed(result.allowed);
    };
    checkPermission();
  }, [providerId]);

  if (!isAllowed) {
    return (
      <div className="mt-8 text-center text-gray-500">
        Solo puedes comentar después de finalizar un servicio con este proveedor
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h4 className="font-semibold mb-2">Deja tu comentario</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center mb-2">
                    <span className="mr-2">Tu puntuación:</span>
                    {[...Array(5)].map((_, i) => {
                      const ratingValue = i + 1;
                      return (
                        <button
                          type="button"
                          key={i}
                          onClick={() => handleStarClick(ratingValue)}
                          className="focus:outline-none"
                        >
                          <StarIcon
                            className={`w-5 h-5 ${
                              ratingValue <= selectedRating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            } cursor-pointer transition-colors`}
                          />
                        </button>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Escribe tu comentario aquí..."
                    className="mb-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <LoadingButton
            isLoading={loading}
            labelButton="Enviar comentario"
            loadingLabel="Enviando..."
            type="submit"
          />
        </form>
      </Form>
    </div>
  );
}

export default CommentSection;
