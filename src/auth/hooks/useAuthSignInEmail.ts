import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { AuthContext } from "@/auth/context";
import { ISignInWithEmail, Types } from "@/auth/types";
import http, { endpoints } from "@/services/api";

export const useAuthSignInEmail = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  return useCallback(async (values: ISignInWithEmail) => {
    try {
      const res = await http.post(endpoints.auth.sign_in_with_email, {
        email: values.email,
        password: values.password,
        phone_number: "",
        auth_method: "email",
      });

      const accessToken =
        res.data?.data?.access_token ||
        res.data?.tokens?.access_token ||
        res.data?.access_token;

      if (accessToken) {
        localStorage.setItem("access_token", accessToken);

        // Fetch user profile
        try {
          const profileRes = await http.get(endpoints.auth.me, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });
          dispatch({
            type: Types.SIGN_IN_WITH_EMAIL,
            payload: { user: profileRes.data?.data || { email: values.email } },
          });
        } catch {
          // Decode JWT for basic info
          const payload = JSON.parse(atob(accessToken.split(".")[1]));
          dispatch({
            type: Types.SIGN_IN_WITH_EMAIL,
            payload: { user: { _id: payload.user, email: values.email } },
          });
        }

        toast.success("You have successfully signed in.");
        navigate("/dashboard");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error signing in");
    }
  }, []);
};
