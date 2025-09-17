import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import {
    useAuth,
    useUser,
    useClerk,
  } from "@clerk/clerk-react";

const RouteProtection = () => {

    const { getToken, isSignedIn, isLoaded } = useAuth();
    const { user } = useUser();
    const { signOut } = useClerk();
    const navigate = useNavigate();

    useEffect(() => {
        const syncUser = async () => {
            if (isLoaded) {
                try {
                    // Check if user is signed in
                    if (!isSignedIn) {
                        navigate('/sign-up');
                        return;
                    }

                    // Check localStorage for role
                    const role = localStorage.getItem('selectedRole');
                    console.log(role)
                    if (!role) {
                        // No role found in localStorage, sign out user and redirect to sign-up
                        await signOut();
                        navigate('/sign-up');
                        return;
                    }

                    const token = await getToken();
                    await fetch("http://localhost:5000/api/registerUser", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}` },
                        body: JSON.stringify({ role }),
                    });
                } catch (error) {
                    await signOut();
                    navigate('/sign-up');
                    console.log(error);
                }
            }
        };
        syncUser();
    }, [isSignedIn, getToken, user, signOut, navigate]);
    return (
        <Outlet />
    )
}

export default RouteProtection