import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useAuthSignInEmail } from "@/auth/hooks/useAuthSignInEmail";
import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const signInSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be at least 8 character" }),
});

type SignInSchemaForm = z.infer<typeof signInSchema>;

export const SignInWithEmail = () => {
  const { t } = useTranslation("sign-in");
  const [loading, setLoading] = useState<boolean>(false);

  const signInWithEmail = useAuthSignInEmail();

  const form = useForm<SignInSchemaForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: SignInSchemaForm) => {
    setLoading(true);
    await signInWithEmail(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
            <p className="text-center text-md text-gray">{t("description")}</p>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <div className="flex flex-col items-center gap-6 bg-transparent py-8">
              <div className="flex flex-col gap-5">
                <TextField
                  name="email"
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                  className="w-[400px]"
                />
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
