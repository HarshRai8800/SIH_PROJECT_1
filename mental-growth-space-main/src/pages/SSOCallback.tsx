import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    const finalize = async () => {
      if (!isLoaded || !isSignedIn) return;
      
      // The role is already stored in localStorage from the CustomSignUp component
      // No need to call any backend API, just redirect to home
      navigate("/", { replace: true });
    };

    finalize();
  }, [isLoaded, isSignedIn, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthenticateWithRedirectCallback />
      <p className="text-muted-foreground">Finishing sign-in...</p>
    </div>
  );
};

export default SSOCallback;
