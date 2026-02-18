import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/Button";

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("404");

  return (
    <div className="container h-screen w-full px-4 py-16 sm:px-20 sm:py-24">
      <div className="flex h-full flex-col items-start justify-start sm:justify-center">
        <p className="text-left text-md text-primary">{t("errorCode")}</p>
        <h1 className="text-left text-heading-3 sm:text-heading-2">
          {t("title")}
        </h1>
        <p className="mt-2 text-lg text-gray-600 sm:text-xl">
          {t("description")}
        </p>
        <div className="flex w-full flex-col-reverse gap-2 pt-10 sm:flex-row">
          <Button
            variant="outline"
            iconLeft={<ArrowLeft />}
            onClick={() => navigate(-1)}
          >
            {t("goBackButton")}
          </Button>
          <Button variant="primary" onClick={() => navigate("/")}>
            {t("homeButton")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
