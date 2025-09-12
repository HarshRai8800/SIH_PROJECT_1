import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

// ✅ Import i18n config
import "./i18n";

// ✅ Import the new context provider
import { UserProfileProvider } from "./context/UserProfileContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      {/* ✅ Wrap App with UserProfileProvider so the profile is accessible everywhere */}
      <UserProfileProvider>
        <App />
      </UserProfileProvider>
    </ClerkProvider>
  </StrictMode>
);
