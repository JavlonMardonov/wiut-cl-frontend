import { RouteObject } from "react-router-dom";

import { GoogleCallback } from "@/auth/google/googleCallback";
import { EmailOtp } from "@/pages/Auth/AuthOtp/EmailOtp/EmailOtp";
import { SmsOtp } from "@/pages/Auth/AuthOtp/SmsOtp";
import { ForgotPassword } from "@/pages/Auth/AuthPassword/ForgotPassword/ForgotPassword";
import { ResetPassword } from "@/pages/Auth/AuthPassword/ResetPassword/ResetPassword";
import { SignInWithEmail } from "@/pages/Auth/AuthWithEmail/SignInWithEmail/SignInWithEmail";
import { SignUpWithEmail } from "@/pages/Auth/AuthWithEmail/SignUpWithEmail";
import { VerifyEmail } from "@/pages/Auth/AuthWithEmail/VerifyEmail";
import { SignInWithPhone } from "@/pages/Auth/AuthWithPhone/SignInWithPhone";
import { SignUpWithPhone } from "@/pages/Auth/AuthWithPhone/SignUpWithPhone/SignUpWithPhone";
import { VerifyPhoneNumber } from "@/pages/Auth/AuthWithPhone/VerifyPhoneNumber";

export const authRoutes: RouteObject[] = [
  {
    path: "/auth",
    children: [
      {
        path: "sign-up-phone",
        element: <SignUpWithPhone />,
      },
      {
        path: "sign-in-phone",
        element: <SignInWithPhone />,
      },
      {
        path: "sign-in",
        element: <SignInWithEmail />,
      },
      {
        path: "sign-in-email",
        element: <SignInWithEmail />,
      },
      {
        path: "sign-up-email",
        element: <SignUpWithEmail />,
      },
      {
        path: "email-otp",
        element: <EmailOtp />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "otp",
        children: [
          {
            path: "verify-phone",
            element: <VerifyPhoneNumber />,
          },
          {
            path: "verify-code",
            element: <SmsOtp />,
          },
        ],
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "google/callback",
        element: <GoogleCallback />,
      },
    ],
  },
];
