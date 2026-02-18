import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { Form } from "@/components/_form/Form";
import { OTPField } from "@/components/_rhf/OTP";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card/Card";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const resetOTPSchema = z.object({
  code: z.string().min(6),
});
type ResetOTPFormSchema = z.infer<typeof resetOTPSchema>;

export const ResetOtp = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<ResetOTPFormSchema>({
    resolver: zodResolver(resetOTPSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSubmit = async (formData: ResetOTPFormSchema) => {
    navigate(
      `/auth/reset-password?email=${searchParams.get("email")}&code=${formData.code}`,
    );

    return formData;
  };
  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <Card className="h-12 w-12 bg-white shadow-lg">
            <img src="/logo.png" alt="logo" />
          </Card>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">Check your phone</h1>
            <div>
              <p className="text-center text-md text-gray">
                We sent a verification code
              </p>
              <p className="text-center text-md text-gray">
                {searchParams.get("email")}
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
              <OTPField name="code" />
            </div>
            <LoadingButton
              type="submit"
              isLoading={false}
              variant="primary"
              size="lg"
              className="w-full text-md"
            >
              Verify email
            </LoadingButton>
            <div className="flex flex-row items-center gap-1">
              <p>Didn’t receive the email?</p>
              <Button variant="primary-link" size="link">
                Click to resend
              </Button>
            </div>
          </form>
        </Form>
        <Button
          variant="link"
          size="link"
          iconLeft={<ArrowLeft size={20} />}
          onClick={() => navigate("/auth/sign-in")}
        >
          Back to log in
        </Button>
      </div>
    </AuthLayout>
  );
};
