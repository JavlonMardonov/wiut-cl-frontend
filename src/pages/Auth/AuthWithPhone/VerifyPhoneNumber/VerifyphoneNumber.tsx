import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuthSendOtp } from "@/auth/hooks/useAuthSendOtp";
import { Form } from "@/components/_form/Form";
import { PhoneNumberField } from "@/components/_rhf/PhoneNumber";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const verifyPhoneNumberSchema = z.object({
  phone: z.string().min(3, { message: "phone number is required" }),
});

type VerifyPhoneNumberSchemaForm = z.infer<typeof verifyPhoneNumberSchema>;

export const VerifyPhoneNumber = () => {
  const { t } = useTranslation("verify-phonenumber");
  const [loading, setLoading] = useState<boolean>(false);

  const sendOtpCode = useAuthSendOtp();

  const form = useForm<VerifyPhoneNumberSchemaForm>({
    resolver: zodResolver(verifyPhoneNumberSchema),
    defaultValues: {
      phone: "",
    },
  });

  const handleSubmit = async (formData: VerifyPhoneNumberSchemaForm) => {
    setLoading(true);
    await sendOtpCode(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
            <p className="text-center text-md text-gray">{t("description")}</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col items-center gap-6">
              <div className="flex flex-col gap-5">
                <PhoneNumberField defaultCountry="UZ" name="phone" size="lg" />
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <LoadingButton
                  type="submit"
                  isLoading={loading}
                  variant="primary"
                  size="lg"
                  className="w-full text-md"
                >
                  {t("verifyPhoneNumberButton")}
                </LoadingButton>
              </div>
            </div>
          </form>
        </Form>
        <div className="flex flex-row items-center gap-1">
          <p className="text-center text-sm text-gray">{t("footerTitle")} </p>
          <Button variant="primary-link" size="link" asChild>
            <Link to="/auth/sign-in">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
