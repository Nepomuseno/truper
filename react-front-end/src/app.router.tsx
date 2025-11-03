import { lazy } from "react";
import { createBrowserRouter } from "react-router";

export const appRoutes = createBrowserRouter([
  {
    path: "/",
    Component: lazy(() => import("./layouts/MainLayout")),
    children: [
      {
        index: true,
        Component: lazy(() => import("./pages/HomePage")),
      },
    ],
  },
]);
