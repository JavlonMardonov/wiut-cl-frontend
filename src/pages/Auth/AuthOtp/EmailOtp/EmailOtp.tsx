import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Form } from "@/components/_form/Form";
import { OTPField } from "@/components/_rhf/OTP";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const emailOTPSchema = z.object({
  code: z.string().min(6),
});

type EmailOTPFormSchema = z.infer<typeof emailOTPSchema>;

export const EmailOtp = () => {
  const { t } = useTranslation("email-verification");

  const navigate = useNavigate();
  const form = useForm<EmailOTPFormSchema>({
    resolver: zodResolver(emailOTPSchema),
    defaultValues: {
      code: "",
    },
  });
  const handleSubmit = async (values: EmailOTPFormSchema) => {
    navigate("/");

    return values;
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
            <div>
              <p className="text-center text-md text-gray">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col items-center justify-center gap-6"
          >
            <div className="flex items-center justify-center">
              <OTPField
                name="code"
                label={t("verificationCodeLabel")}
                // @ts-expect-error
                placeholder={t("verificationCodePlaceholder")}
              />
            </div>
            <LoadingButton
              type="submit"
              isLoading={false}
              variant="primary"
              size="lg"
              className="w-full text-md"
            >
              {t("buttonTitle")}
            </LoadingButton>
            <div className="flex flex-row items-center gap-1">
              <p>{t("resendText")}</p>
              <Button variant="primary-link" size="link">
                {t("resendButton")}
              </Button>
            </div>
          </form>
        </Form>
        <Button
          variant="link"
          size="link"
          iconLeft={<ArrowLeft size={20} />}
          onClick={() => navigate("/auth/login")}
        >
          {t("footerTitle")}
        </Button>
      </div>
    </AuthLayout>
  );
};
