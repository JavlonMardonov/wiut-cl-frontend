import { FC } from "react";

import { Spinner } from "../Spinner";

export const PageLoading: FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-background">
      <Spinner size="lg" />
    </div>
  );
};
