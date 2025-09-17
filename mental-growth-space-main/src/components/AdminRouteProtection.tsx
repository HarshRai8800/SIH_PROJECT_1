import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth, useUser, useClerk } from "@clerk/clerk-react";

const AdminRouteProtection = () => {
    const { getToken, isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const verifyAdmin = async () => {
            if (!isLoaded) return;

            try {
                console.log("12223344")
                if (!isSignedIn) {
                    navigate("/sign-up");
                    return;
                }

                const role = localStorage.getItem("selectedRole");

                if (role !== "admin") {
                    // Don't sign out, just redirect to admin login
                    navigate("/admin/login");
                    return;
                }

                const token = await getToken();
                const response = await fetch(
                    "http://localhost:5000/api/admin/login",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!response.ok) {
                    // Don't throw error, just redirect to admin login
                    navigate("/admin/login");
                    return;
                }
            } catch (err) {
                console.error("Admin route protection error:", err);
                // Don't sign out, just redirect to admin login
                navigate("/admin/login");
            } finally {
                setChecking(false);
            }
        };

        verifyAdmin();
    }, [isLoaded, isSignedIn, getToken, navigate]);

    if (checking) {
        return <div className="flex items-center justify-center h-screen">Checking admin access...</div>;
    }

    return <Outlet />;
};

export default AdminRouteProtection;
