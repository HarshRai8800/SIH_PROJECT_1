import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { toast } from "sonner";

interface UserProfile {
  firstName: string;
  lastName: string;
  imageUrl: string;
  languages: string[];
}

const languagesList = ["English", "Hindi", "Urdu", "Dogri", "Punjabi"];

const EditProfilePage = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    imageUrl: "",
    languages: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  // ✅ Fetch user data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = await getToken();
        const res = await axios.get("https://sih-project-1-1.onrender.com/api/get/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            clerkId: user.id,
          },
        });

        const data = res.data.student as UserProfile;
        console.log(res.data.student)
        setFormData({
          firstName: data.firstName || "",
          lastName: data.lastName || "",
          imageUrl: data.imageUrl || "",
          languages: data.languages || [],
        });
        setPreviewImage(data.imageUrl || "");
      } catch (err) {
        console.error("Error fetching profile:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user, getToken]);

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle language toggle
  const toggleLanguage = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.includes(lang)
        ? prev.languages.filter((l) => l !== lang)
        : [...prev.languages, lang],
    }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      // For backend upload, you would normally send `file`
      setFormData({ ...formData, imageUrl: imageUrl });
    }
  };

  // ✅ Submit updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    try {
      const token = await getToken();

      const res = await axios.put(
        "https://sih-project-1-1.onrender.com/api/user/update",
        {
          clerkId: user.id,
          firstName: formData.firstName,
          lastName: formData.lastName,
          imageUrl: formData.imageUrl,
          languages: formData.languages,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data)

      toast.success("Profile updated successfully!", {
  duration: 3000, // 3 seconds
  description: "Your changes have been saved successfully."
});
    } catch (err) {
      console.error("Error updating profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading profile…</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-rose-50 to-pink-100">
  <Navbar />

  {/* Main content takes full available space */}
  <div className="flex-1 flex items-center justify-center px-4 py-8">
    <Card className="w-full max-w-3xl p-8 flex gap-8 items-center">
      {/* Profile Image Section */}
      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-2 border-rose-300 bg-rose-50">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          ) : (
            <span className="text-gray-500 text-sm font-medium">Profile</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <p className="text-sm text-gray-600">Click image to change</p>
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 space-y-4 flex flex-col justify-center"
      >
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

        {/* Languages Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Languages
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {formData.languages.length > 0
                  ? `${formData.languages.length} selected`
                  : "Select languages"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2 space-y-1">
              {languagesList.map((lang) => (
                <div
                  key={lang}
                  className="flex items-center cursor-pointer px-2 py-1 rounded-md hover:bg-rose-50"
                  onClick={() => toggleLanguage(lang)}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      formData.languages.includes(lang)
                        ? "opacity-100 text-rose-500"
                        : "opacity-0"
                    }`}
                  />
                  {lang}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

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


