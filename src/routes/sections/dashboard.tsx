import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/Protected/Dashboard"));
const Products = lazy(() => import("@/pages/Protected/Products"));
const Clients = lazy(() => import("@/pages/Protected/Clients"));

export const dashboard: RouteObject[] = [
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "clients",
        element: <Clients />,
      },
    ],
  },
];
