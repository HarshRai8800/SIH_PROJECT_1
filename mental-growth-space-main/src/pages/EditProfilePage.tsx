import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
  languages: string; // comma-separated for easy input
}

const EditProfilePage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    imageUrl: "",
    languages: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch user data once on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
      const res = await axios.post(
  "http://localhost:5000/api/user/getUser",
  {
    clerkId: user.id,           // ✅ body data
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);
console.log("Profile data:", res.data); // Debug log

        const data = res.data as {
          firstName?: string;
          lastName?: string;
          email: string;
          imageUrl?: string;
          languages: string[];
        };

        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          email: data.email || "",
          imageUrl: data.imageUrl || "",
          languages: data.languages?.join(", ") || "",
        });
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, getToken]);

  // ✅ Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const token = await getToken();

      await axios.put(
        "http://localhost:5000/api/user/update",
        {
          clerkId: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          imageUrl: formData.imageUrl,
          languages: formData.languages
            .split(",")
            .map((lang) => lang.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto p-6 space-y-4">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />
            <Input
              name="email"
              placeholder="Email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
            />
            <Input
              name="languages"
              placeholder="Languages (comma separated)"
              value={formData.languages}
              onChange={handleChange}
            />
            <Button type="submit" className="w-full" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default EditProfilePage;
