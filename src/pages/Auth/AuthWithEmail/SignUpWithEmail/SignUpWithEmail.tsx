import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { z } from "zod";

import { useSignUpWithEmail } from "@/auth/hooks/useAuthSignUpEmail";
import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const signUpSchema = z.object({
  fio: z.string(),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password is required" }),
});

type SignUpSchemaForm = z.infer<typeof signUpSchema>;

export const SignUpWithEmail = () => {
  const { t } = useTranslation("sign-up");
  const [loading, setLoading] = useState<boolean>(false);

  const signUpWithEmail = useSignUpWithEmail();

  const form = useForm<SignUpSchemaForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fio: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: SignUpSchemaForm) => {
    setLoading(true);
    await signUpWithEmail(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mt-24 flex w-full flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-heading-5">{t("title")}</h1>
            <p className="w-[380px] text-center text-md text-gray">
              {t("description")}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full max-w-[440px]"
          >
            <div className="flex w-full flex-col items-center gap-6 p-8">
              <div className="flex w-full flex-col gap-5">
                <TextField
                  name="fio"
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                />
                <TextField
                  name="email"
                  label={t("emailLabel")}
                  placeholder={t("emailPlaceholder")}
                />
                <PasswordField
                  name="password"
                  label={t("passwordLabel")}
                  helperText={t("passwordRequirement")}
                  placeholder={t("passwordPlaceholder")}
                />
              </div>
              <div className="flex w-full flex-col items-center gap-3">
                <LoadingButton
                  type="submit"
                  isLoading={loading}
                  variant="primary"
                  size="lg"
                  className="w-full text-md"
                >
                  {t("signUpButtonTitle")}
                </LoadingButton>
                <AuthWithGoogle />
              </div>
            </div>
          </form>
        </Form>

        <div className="flex flex-row items-center gap-1">
          <p className="text-center text-sm text-gray">{t("footerTitle")} </p>
          <Button variant="primary-link" size="link" asChild>
            <Link to="/auth/login">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
