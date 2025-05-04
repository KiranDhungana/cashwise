// toast.ts
import { notifications } from "@mantine/notifications";

type ToastType = "success" | "error" | "info" | "loading";

interface ShowToastProps {
  title?: string;
  message: string;
  type?: ToastType;
}

export function showToast({ title = "Notice", message, type = "info" }: ShowToastProps) {
  const colorMap: Record<ToastType, string> = {
    success: "green",
    error: "red",
    info: "blue",
    loading: "gray",
  };

  notifications.show({
    position: "top-right",
    withCloseButton: true,
    title,

    message,
    color: colorMap[type],
  });
}
