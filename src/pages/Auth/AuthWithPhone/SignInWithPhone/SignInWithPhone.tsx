import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuthSignInPhone } from "@/auth/hooks/useAuthSignInPhone";
import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { PhoneNumberField } from "@/components/_rhf/PhoneNumber";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const signInSchema = z.object({
  phone: z.string(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 character" }),
});

type SignInSchemaForm = z.infer<typeof signInSchema>;

export const SignInWithPhone = () => {
  const { t } = useTranslation("sign-in");
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithPhone = useAuthSignInPhone();

  const form = useForm<SignInSchemaForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: SignInSchemaForm) => {
    setLoading(true);
    await signInWithPhone(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
            <p className="text-center text-md text-gray">{t("description")}</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <div className="flex flex-col items-center gap-6 bg-transparent py-8">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                  <PhoneNumberField
                    defaultCountry="UZ"
                    name="phone"
                    size="default"
                  />
                </div>
                <PasswordField
                  name="password"
                  label={t("passwordLabel")}
                  placeholder={t("passwordPlaceholder")}
                  className="w-[400px]"
                />
              </div>
              <div className="flex flex-row self-end">
                <Button variant="primary-link" size="link" asChild>
                  <Link to="/auth/forgot-password">
                    {t("forgotPasswordTitle")}
                  </Link>
                </Button>
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <LoadingButton
                  type="submit"
                  isLoading={loading}
                  variant="primary"
                  size="lg"
                  className="w-full text-md"
                >
                  {t("signInButtonTitle")}
                </LoadingButton>
                <AuthWithGoogle />
              </div>
            </div>
          </form>
        </Form>

        <div className="flex flex-row items-center gap-1">
          <p className="text-center text-sm text-gray">{t("footerTitle")} </p>
          <Button variant="primary-link" size="link" asChild>
            <Link to="/auth/sign-up">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
