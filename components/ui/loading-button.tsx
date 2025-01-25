"use client";

import * as React from "react";
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Typography from "./typography";

export interface LoadingButtonProps extends ButtonProps {
  onClick?: () => void;
  isLoading: boolean;
  labelButton?: string;
  loadingLabel?: string;
}

export const LoadingButton = React.forwardRef<
  HTMLButtonElement,
  LoadingButtonProps
>(
  (
    {
      onClick,
      isLoading,
      labelButton = "Botón",
      loadingLabel = "Cargando...",
      className,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        onClick={onClick}
        disabled={isLoading}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin" />
            <Typography variant="button">{loadingLabel}</Typography>
          </>
        ) : (
          <Typography variant="button">{labelButton}</Typography>
        )}
      </Button>
    );
  }
);

LoadingButton.displayName = "LoadingButton";
