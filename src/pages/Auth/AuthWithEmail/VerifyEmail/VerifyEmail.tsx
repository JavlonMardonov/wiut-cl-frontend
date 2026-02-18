import { ArrowLeft } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { Button } from "@/components/Button";
import { AuthLayout } from "@/layout/Auth";

export const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="z-10 mx-auto flex w-[400px] flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-center text-heading-5">Check your email</h1>
            <div>
              <p className="text-center text-md text-gray">
                We sent a verification link to
              </p>
              <p className="text-center text-md font-semibold">
                {searchParams.get("email")}
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <p className="text-center text-md text-gray">
            Click the link in the email to verify your account. If you
            don&apos;t see the email, check your spam folder.
          </p>
          <Link
            to={`/auth/reset-password?email=${searchParams.get("email")}`}
            className="w-full"
          >
            <Button variant="primary" size="lg" className="w-full text-md">
              Open email app
            </Button>
          </Link>
          <div className="flex flex-row items-center gap-1">
            <p className="text-md text-gray">Didn&apos;t receive the email?</p>
            <Button variant="primary-link" size="link">
              Click to resend
            </Button>
          </div>
        </div>
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
