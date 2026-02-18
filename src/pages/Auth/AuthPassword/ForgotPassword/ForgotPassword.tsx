import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Form } from "@/components/_form/Form";
import { TextField } from "@/components/_rhf/Text";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordSchema>;

export const ForgotPassword = () => {
  const { t } = useTranslation("forgot-password");
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (formData: ForgotPasswordFormSchema) => {
    navigate(`/auth/otp?email=${formData.email}`);
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
            <p className="text-center text-md text-text-tertiary">
              {t("description")}
            </p>
          </div>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex w-full flex-col gap-6"
          >
            <TextField
              name="email"
              label={t("emailLabel")}
              placeholder={t("emailPlaceholder")}
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
          onClick={() => navigate("/auth/login")}
        >
          {t("footerTitle")}
        </Button>
      </div>
    </AuthLayout>
  );
};
