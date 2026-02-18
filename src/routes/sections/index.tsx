import { Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";

import { notFound } from "./404";
import { authRoutes } from "./auth";
import { dashboard } from "./dashboard";
import { exposed } from "./exposed";

export const Router = () => {
  const { authenticated, unauthenticated } = useAuthContext();

  const routes = [
    ...exposed,
    ...(authenticated
      ? [{ path: "*", element: <Navigate to="/" /> }]
      : authRoutes),
    ...(unauthenticated
      ? [{ path: "*", element: <Navigate to="/auth/sign-in" /> }]
      : dashboard),
    ...notFound,
  ];

  const router = createBrowserRouter(routes);

  return (
    <Suspense fallback="Loading...">
      <RouterProvider router={router} />
    </Suspense>
  );
};
