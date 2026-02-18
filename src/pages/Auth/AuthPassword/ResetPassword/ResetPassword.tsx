import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Form } from "@/components/_form/Form";
import { PasswordField } from "@/components/_rhf/Password";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type ResetPasswordFormSchema = z.infer<typeof resetPasswordSchema>;

export const ResetPassword = () => {
  const { t } = useTranslation("reset-password");
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const handleSubmit = (formData: ResetPasswordFormSchema) => {
    navigate("/");

    return formData;
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
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
            className="flex flex-col gap-6"
          >
            <PasswordField
              name="password"
              label={t("passwordLabel")}
              placeholder={t("passwordPlaceholder")}
              className="w-[400px]"
            />
            <PasswordField
              name="confirm_password"
              label={t("confirmPasswordLabel")}
              placeholder={t("confirmPasswordPlaceholder")}
              className="w-[400px]"
            />
            <LoadingButton
              type="submit"
              isLoading={false}
              variant="primary"
              size="lg"
              className="w-full text-md"
            >
              {t("buttonTitle")}
            </LoadingButton>
          </form>
        </Form>
        <Button
          variant="link"
          size="link"
          iconLeft={<ArrowLeft size={20} />}
          onClick={() => navigate("/auth/sign-in")}
        >
          {t("footerTitle")}
        </Button>
      </div>
    </AuthLayout>
  );
};
