import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthContext } from "@/auth/context";
import { ISignUpWithEmail, Types } from "@/auth/types";
import http, { endpoints } from "@/services/api";

export const useSignUpWithEmail = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  return useCallback(
    async (values: ISignUpWithEmail) => {
      try {
        // Backend uses signin-with-pass for both signin and signup
        const res = await http.post(endpoints.auth.sign_up_with_email, {
          email: values.email,
          password: values.password,
          auth_method: "email",
        });

        const accessToken =
          res.data?.data?.access_token ||
          res.data?.tokens?.access_token ||
          res.data?.access_token;

        if (accessToken) {
          localStorage.setItem("access_token", accessToken);

          try {
            const profileRes = await http.get(endpoints.auth.me, {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            dispatch({
              type: Types.SIGN_UP_WITH_EMAIL,
              payload: {
                user: profileRes.data?.data || { email: values.email },
              },
            });
          } catch {
            const payload = JSON.parse(atob(accessToken.split(".")[1]));
            dispatch({
              type: Types.SIGN_UP_WITH_EMAIL,
              payload: {
                user: { _id: payload.user, email: values.email },
              },
            });
          }

          toast.success("You have successfully registered.");
          navigate("/dashboard");
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error signing up.");
      }
    },
    [dispatch],
  );
};
