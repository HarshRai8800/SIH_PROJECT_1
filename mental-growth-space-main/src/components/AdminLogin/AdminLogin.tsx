import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useSignIn, useClerk, useAuth } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminLogin = () => {
    const navigate = useNavigate();
    const { isLoaded: isSignUpLoaded, signUp, setActive } = useSignUp();
    const { isLoaded: isSignInLoaded, signIn } = useSignIn();
    const { signOut } = useClerk();
    const { isSignedIn  } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [pendingVerification, setPendingVerification] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError("");
        if (!isSignUpLoaded) return;
        if (!email || !password) {
            setError("Please enter email and password.");
            return;
        }
        try {
            setLoading(true);
            await signUp.create({
                emailAddress: email,
                password,
            });
            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
            setPendingVerification(true);
        } catch (err) {
            setError(err?.errors?.[0]?.longMessage || err?.message || "Sign up failed");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        setError("");
        if (!isSignUpLoaded) return;
        if (!code) {
            setError("Enter the verification code sent to your email.");
            return;
        }
        try {
            setLoading(true);
            const result = await signUp.attemptEmailAddressVerification({ code });
            if (result.status === "complete") {
                await setActive({ session: result.createdSessionId });
                // Save role to localStorage
                localStorage.setItem("selectedRole", "admin");
                navigate("/admin", { replace: true });
            } else {
                setError("Verification incomplete. Please try again.");
            }
        } catch (err) {
            navigate("/admin/login");
            setError(err?.errors?.[0]?.longMessage || err?.message || "Verification failed");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        if (!isSignInLoaded) return;

        try {
            // Store role before redirect so we can use it after Google OAuth
            localStorage.setItem("selectedRole", "admin");

            // If user is already signed in, sign them out first
            if (isSignedIn) {
                await signOut();
                // Wait a moment for the sign out to complete
                await new Promise(resolve => setTimeout(resolve, 100));
            }

            await signIn.authenticateWithRedirect({
                strategy: "oauth_google",
                redirectUrl: "/sso-callback",
                redirectUrlComplete: "/admin",
            });
        } catch (err) {
            setError(err?.errors?.[0]?.longMessage || err?.message || "Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl">Admin Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {!pendingVerification ? (
                            <form className="space-y-4" onSubmit={handleEmailSignup}>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="text-sm text-red-600" role="alert">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Creating account..." : "Sign up with Email"}
                                </Button>

                                <div className="flex items-center gap-2">
                                    <div className="h-px flex-1 bg-border" />
                                    <span className="text-xs text-muted-foreground">OR</span>
                                    <div className="h-px flex-1 bg-border" />
                                </div>

                                <Button type="button" variant="outline" className="w-full" onClick={handleGoogle}>
                                    Continue with Google
                                </Button>
                            </form>
                        ) : (
                            <form className="space-y-4" onSubmit={handleVerify}>
                                <div className="space-y-2">
                                    <Label htmlFor="code">Verification code</Label>
                                    <Input
                                        id="code"
                                        type="text"
                                        placeholder="Enter the 6-digit code"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="text-sm text-red-600" role="alert">
                                        {error}
                                    </div>
                                )}

                                <Button type="submit" className="w-full" disabled={loading}>
                                    {loading ? "Verifying..." : "Verify and continue"}
                                </Button>
                            </form>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminLogin;


