import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    loadComponent: () => import("./pages/home/home.component").then((m) => m.HomeComponent),
  },
  {
    path: "comparador/:id",
    loadComponent: () => import("./pages/comparador/comparador.component").then((m) => m.ComparadorComponent),
  },
  {
    path: "**",
    redirectTo: "dashboard",
  },
];
