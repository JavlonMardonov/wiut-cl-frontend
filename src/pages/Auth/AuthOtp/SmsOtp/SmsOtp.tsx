import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { z } from "zod";

import { useAuthVerifyOtp } from "@/auth/hooks/useAuthVerifyOtp";
import { Form } from "@/components/_form/Form";
import { OTPField } from "@/components/_rhf/OTP";
import { Button } from "@/components/Button";
import { LoadingButton } from "@/components/LoadingButton/LoadingButton";
import { AuthLayout } from "@/layout/Auth";

const OTPSchema = z.object({
  phone: z.string(),
  code: z.preprocess(
    (value) => parseInt(value as string, 10),
    z.number().min(6),
  ),
  code_hash: z.string(),
});

type OTPFormSchema = z.infer<typeof OTPSchema>;

export const SmsOtp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const codeHash: any = searchParams.get("codeHash");

  const verifyOtpCode = useAuthVerifyOtp();

  const form = useForm<OTPFormSchema>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      phone: "+998123456789",
      code: 0,
      code_hash: codeHash,
    },
  });

  const handleSubmit = async (formData: OTPFormSchema) => {
    setLoading(true);
    await verifyOtpCode(formData);
    setLoading(false);
  };

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">Check your phone</h1>
            <div>
              <p className="text-center text-md text-gray">
                We sent a verification code.
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
              isLoading={loading}
              variant="primary"
              size="lg"
              className="w-full text-md"
            >
              Verify phone number
            </LoadingButton>
            <div className="flex flex-row items-center gap-1">
              <p>Didn’t receive the phone?</p>
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
