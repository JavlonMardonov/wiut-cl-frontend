import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Dashboard = lazy(() => import("@/pages/Protected/Dashboard"));
const LessonDetails = lazy(() => import("@/pages/Protected/LessonDetails"));

export const dashboard: RouteObject[] = [
  {
    path: "/dashboard",
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/lesson/:id",
    element: <LessonDetails />,
  },
];
