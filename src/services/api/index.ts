/* eslint-disable no-param-reassign */
import axios from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error?.response?.status === 401) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }

    throw error;
  },
);

export default http;

export const endpoints = {
  auth: {
    me: "/profile",
    // OTP based
    send_otp_code: "/auth/otp/phone-number",
    send_email_otp: "/auth/otp/email",
    signin: "/auth/signin",
    // Password based
    sign_in_with_email: "/auth/signin-with-pass",
    sign_up_with_email: "/auth/signin-with-pass",
    sign_in_phone: "/auth/signin-with-pass",
    sign_up_phone: "/auth/signin-with-pass",
    // Google
    sign_in_with_google: "/auth/google",
    // Other
    verify_phone_otp: "/auth/signin",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
  },
  lessons: {
    list: "/lessons",
    details: (id: string) => `/lessons/${id}`,
  },
  subsections: {
    byLesson: (lessonId: string) => `/subsections/lesson/${lessonId}`,
    details: (id: string) => `/subsections/${id}`,
  },
  progress: {
    overview: "/progress/overview",
    byLesson: (lessonId: string) => `/progress/lesson/${lessonId}`,
    complete: "/progress/complete",
    incomplete: (subsectionId: string) => `/progress/incomplete/${subsectionId}`,
  },
};
