import { RouterProvider } from "react-router";
import { appRoutes } from "./app.router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "sonner";
import { CustomHeader } from "./components/custom/CustomHeader";

const queryClient = new QueryClient();

export const TruperApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CustomHeader />
      <RouterProvider router={appRoutes} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
