import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Landing = lazy(() => import("@/pages/Public/Landing"));

export const exposed: RouteObject[] = [
  {
    path: "/",
    element: <Landing />,
  },
];
