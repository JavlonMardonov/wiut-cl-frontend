import { Link } from "react-router-dom";

import { useAuthContext } from "@/auth/hooks/useAuthContext";
import { Button } from "@/components/Button";
import { ThemeToggler } from "@/components/ThemeToggler";
import { AuthWithGoogle } from "@/pages/Auth/AuthGoogle/AuthWithGoogle";

const Landing = () => {
  const { logout, authenticated, unauthenticated, user } = useAuthContext();

  return (
    <div className="flex h-[100vh] items-center justify-center gap-14">
      <ThemeToggler />
      <div className="flex items-center gap-10">
        <Link to="/auth/otp/verify-phone">Sign Up with phone</Link>
        <Link to="/auth/sign-in-phone">Sign In with phone</Link>
        <Link to="/auth/sign-in-email">Sign In with email</Link>
        <Link to="/auth/sign-up-email">Sign Up with email</Link>
        <div className="flex items-center gap-2">
          {unauthenticated && <AuthWithGoogle />}
          {user && <p>{user.fio}</p>}
          {authenticated && (
            <Button variant="primary" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Landing;
