import { lazy } from "react";
import { RouteObject } from "react-router-dom";

import { AppLayout } from "@/layout/AppLayout";

const Dashboard = lazy(() => import("@/pages/Protected/Dashboard"));
const LessonDetails = lazy(() => import("@/pages/Protected/LessonDetails"));

export const dashboard: RouteObject[] = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/lesson/:id",
        element: <LessonDetails />,
      },
      {
        path: "/progress",
        element: <Dashboard />, // reuse dashboard for now, shows progress cards
      },
    ],
  },
];
