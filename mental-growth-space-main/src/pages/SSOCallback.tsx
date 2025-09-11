import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

const SSOCallback = () => {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn, getToken } = useAuth();

  useEffect(() => {
    const finalize = async () => {
      if (!isLoaded || !isSignedIn) return;
      try {
        const token = await getToken();
        const role = localStorage.getItem("selectedRole") || undefined;
        if (token) {
          await fetch("http://localhost:5000/api/registerUser", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ role }),
          });
        }
      } catch {}

      // Redirect to home as requested
      navigate("/", { replace: true });
    };

    finalize();
  }, [isLoaded, isSignedIn, getToken, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthenticateWithRedirectCallback />
      <p className="text-muted-foreground">Finishing sign-in...</p>
    </div>
  );
};

export default SSOCallback;


