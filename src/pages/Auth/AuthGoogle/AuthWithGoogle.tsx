import { useAuthGoogle } from "@/auth/hooks/useAuthGoogle";
import { Button } from "@/components/Button";

export const AuthWithGoogle = () => {
  const signInWithGoogle = useAuthGoogle();

  return (
    <Button
      iconLeft={
        <img
          src="/assets/icons/social/google.png"
          alt="google"
          width={24}
          height={24}
        />
      }
      onClick={signInWithGoogle}
      variant="outline"
      className="w-full border-gray-100 text-md font-semibold text-gray-600"
    >
      Sign In With Google
    </Button>
  );
};
