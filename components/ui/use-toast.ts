"use client"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = (props: ToastProps) => {
    // In a real implementation, this would show a toast
    console.log("Toast:", props)
  }

  return {
    toast,
  }
}
