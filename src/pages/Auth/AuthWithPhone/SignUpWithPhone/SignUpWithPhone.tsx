import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { useAuthSignUpPhone } from "@/auth/hooks/useAuthSignUpPhone";
import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const signUpSchema = z.object({
  phone: z.string(),
  fio: z.string().min(3, { message: "Name is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

type SignUpSchemaForm = z.infer<typeof signUpSchema>;

export const SignUpWithPhone = () => {
  const { t } = useTranslation("sign-up");
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const signUpWithPhone = useAuthSignUpPhone();

  const form = useForm<SignUpSchemaForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      phone: `+${searchParams.get("phone")?.toString()}`,
      fio: "",
      password: "",
    },
  });

  const handleSubmit = async (formData: SignUpSchemaForm) => {
    setLoading(true);
    await signUpWithPhone(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">{t("title")}</h1>
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
            <div className="flex flex-col items-center gap-6 py-8">
              <div className="flex flex-col gap-5">
                <TextField
                  name="fio"
                  label={t("nameLabel")}
                  placeholder={t("namePlaceholder")}
                  className="w-[400px]"
                />
                <PasswordField
                  name="password"
                  label={t("passwordLabel")}
                  helperText={t("passwordRequirement")}
                  placeholder={t("passwordPlaceholder")}
                  className="w-[400px]"
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
            <Link to="/auth/sign-in">{t("urlTitle")}</Link>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};
