import { SignIn, useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CounsellorSignIn = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    if (isSignedIn) {
      navigate("/counsellor/dashboard", { replace: true }); // redirect if already signed in
    }
  }, [isSignedIn, navigate]);

  if (isSignedIn) return null; // prevent rendering SignIn if already signed in

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <div className="w-full max-w-md p-6 bg-card rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Counsellor Sign In</h2>
        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-primary text-white hover:bg-primary/90",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CounsellorSignIn;
