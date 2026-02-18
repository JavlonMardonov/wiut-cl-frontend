import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="items-strat relative flex h-screen justify-center bg-bg-primary bg-cover bg-center">
      <div
        className="absolute inset-0 left-1/4 right-0 h-1/3 w-1/2 bg-[url('/assets/bg-image/auth-bg.png')] bg-cover bg-center dark:hidden"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 left-1/4 right-0 hidden h-1/3 w-1/2 bg-[url('/assets/bg-image/auth-bg-dark.png')] bg-cover bg-center dark:block"
        aria-hidden="true"
      />
      {children}
    </div>
  );
};
