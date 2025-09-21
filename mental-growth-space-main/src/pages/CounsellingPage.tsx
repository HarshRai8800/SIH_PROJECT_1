import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar/SideBar";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import axios from "axios";
import HelplineSidebar from "./HelpLineBar";

export default function CounsellingPage() {
  const [counsellor, setCounsellor] = useState<any | null>(null);
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("GENERAL");
  const [meetingType, setMeetingType] = useState<"online" | "offline" | null>(
    null
  );
  const [meetingLocation, setMeetingLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [submitted, setSubmitted] = useState<null | any>(null);
  const [countdown, setCountdown] = useState<string>("");

  const { user } = useUser();
  const { getToken } = useAuth();

  // Load selected counsellor
  useEffect(() => {
    const stored = localStorage.getItem("counsellor");
    if (stored) setCounsellor(JSON.parse(stored));

    const handleChange = () => {
      const updated = localStorage.getItem("counsellor");
      setCounsellor(updated ? JSON.parse(updated) : null);
    };

    window.addEventListener("counsellor-changed", handleChange);
    return () => window.removeEventListener("counsellor-changed", handleChange);
  }, []);

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const validate = () => {
    if (!description.trim())
      return { ok: false, message: "Description required" };

    // Phone validation
    const phoneRegex = /^[5-9]\d{9,11}$/;
    if (!phoneRegex.test(phone)) {
      return {
        ok: false,
        message:
          "Phone must be 10–12 digits and start with a number between 5 and 9",
      };
    }

    if (!timing) return { ok: false, message: "Timing required" };
    if (concerns.length === 0)
      return { ok: false, message: "Select concerns" };
    if (!severity) return { ok: false, message: "Severity required" };
    if (!counsellor) return { ok: false, message: "Select a counsellor first" };
    return { ok: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (!v.ok) return toast(v.message);
    const token = await getToken();
try {
  const { data } = await axios.post(
    "https://sih-project-1-9wgj.onrender.com/api/ticket/create_ticket",
    {
      clerkId: user.id,
      discription: description,
      meetingLocation:
        meetingType === "offline" ? meetingLocation : undefined,
      timing,
      level,
      conserns: concerns,
      severityOfCase: severity,
      counsellorId: counsellor.id,
    },
    { headers: { Authorization: `Bearer ${token}` } }
  );

  setSubmitted({ success: true, payload: data });
} catch (err) {
  toast(
  "⚠️ You already have a pending appointment!\nPlease finish your current session before booking a new one.",
  {
    
    description: "You can only have one active appointment at a time.",
    action: {
      label: "View Appointments",
      onClick: () => {
        // optional: navigate to user's appointments page
        window.location.href = "/student-dashboard";
      },
    },
    duration: 8000,         // show for 8 seconds
  }
);
  setSubmitted({ success: false, payload: null });
}
  };

  // Countdown updater
useEffect(() => {
  if (submitted?.success && submitted.payload?.timing) {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const eventTime = new Date(submitted.payload.timing).getTime();
      const diff = eventTime - now;

      if (diff <= 0) {
        setCountdown("✅ Session time has started!");
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s remaining`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }
}, [submitted]);

  return (
  <div className="bg-blue-50 min-h-screen pt-14 flex flex-col">
    <Navbar />

    <div className="flex flex-1 flex-col lg:flex-row py-4 px-0 lg:px-2 gap-6">
      {/* Sidebar on large screens */}
    <div className="hidden lg:flex flex-shrink-0">
    <SideBar />
    </div>

      {/* Search bar on small screens */}
      <div className="lg:hidden mb-4">
        <Input placeholder="Search counsellors..." />
      </div>

      {/* Main content / Form */}
      <div className="flex-1">
        {!counsellor ? (
          <div className="flex justify-center items-center h-full min-h-[50vh]">
            <Card className="p-12 mb-60 bg-white rounded-lg shadow-lg animate-fade-in mt-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                Please select a counsellor
              </h2>
              <p className="text-blue-600 text-center">
                You need to choose a counsellor from the sidebar to proceed with the form.
              </p>
            </Card>
          </div>
        ) : submitted?.success ? (
          <Card className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow-lg animate-fade-in mt-6">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              🎉 Ticket Created Successfully
            </h2>
            <p className="text-blue-700">{countdown}</p>

            <div className="mt-2 text-sm text-blue-600">
              <p>
                <strong>Counsellor:</strong>{" "}
                {submitted.payload.counsellor?.firstName}{" "}
                {submitted.payload.counsellor?.lastName}
              </p>
              {submitted.payload.meetingLocation && (
                <p>
                  <strong>📍 Location:</strong>{" "}
                  {submitted.payload.meetingLocation}
                </p>
              )}
            </div>

            <div className="mt-3 flex-1 gap-8">
              <Button
                type="button"
                onClick={() => {
                  window.location.href = "/student-dashboard";
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setSeverity(null);
                  setTiming("");
                  setDescription("");
                  setMeetingType(null);
                  setPhone(null);
                }}
              >
                Add another appointment
              </Button>
            </div>
          </Card>
        ) : (
          <Card className="p-8 max-w-3xl bg-white rounded-lg shadow-lg animate-fade-in mt-6">
            {/* Change Counsellor Button */}
           <div className="flex items-center justify-center gap-5 mb-3">
            <div>
              Counseller :
            </div>
                <div className="text-2xl font-bold bg-gradient-to-r mr-10 from-blue-600 to-blue-400 bg-clip-text text-transparent text-center">
  {counsellor.firstName} {counsellor.lastName} 
</div>

  <Button
    type="button"
    variant="outline"
    size="sm"
    onClick={() => {
      localStorage.removeItem("counsellor");
      setCounsellor(null);
      toast("Counsellor removed, please choose another one.");
    }}
  >
    Change Counsellor
  </Button>
    
</div>

            {/* === FORM START === */}
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Description */}
              <div className="space-y-1">
                <Label>
                  Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write your issue..."
                  className="min-h-[120px]"
                  required
                />
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label>
                  Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              {/* Meeting Type */}
              <div className="space-y-1">
                <Label>Meeting Type</Label>
                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant={meetingType === "online" ? "default" : "outline"}
                    onClick={() => setMeetingType("online")}
                  >
                    Online
                  </Button>
                  <Button
                    type="button"
                    variant={meetingType === "offline" ? "default" : "outline"}
                    onClick={() => setMeetingType("offline")}
                  >
                    Offline
                  </Button>
                </div>
              </div>

              {meetingType === "offline" && (
                <div className="space-y-1">
                  <Label>Meeting Address</Label>
                  <Input
                    value={meetingLocation}
                    onChange={(e) => setMeetingLocation(e.target.value)}
                    placeholder="Enter meeting address"
                    required
                  />
                </div>
              )}

              {/* Timing */}
              <div className="space-y-1">
                <Label>
                  Date & Time <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="datetime-local"
                  value={timing}
                  onChange={(e) => {
                    const val = e.target.value;
                    setTiming(val);

                    if (val) {
                      const selected = new Date(val);
                      const now = new Date();

                      // At least 1 day later
                      const minDate = new Date();
                      minDate.setDate(now.getDate() + 1);

                      if (selected < minDate) {
                        toast("Please select a date at least 1 day from now");
                        setTiming("");
                        return;
                      }

                      // Must be between 10 AM and 4 PM
                      const hours = selected.getHours();
                      if (hours < 10 || hours >= 16) {
                        toast("Please select a time between 10:00 AM and 4:00 PM");
                        setTiming("");
                      }
                    }
                  }}
                  required
                />
              </div>

              {/* Concerns */}
              <div className="space-y-1">
                <Label>
                  Concerns <span className="text-red-500">*</span>
                </Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {[
                    "MOOD_EMOTIONS",
                    "ANXIETY_STRESS",
                    "SLEEP_ENERGY",
                    "ACADEMICS_PERFORMANCE",
                    "SOCIAL_RELATIONSHIPS",
                    "SELF_PERCEPTION",
                    "RISK_BEHAVIORS",
                    "PHYSICAL_HEALTH",
                  ].map((c) => (
                    <label
                      key={c}
                      className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={concerns.includes(c)}
                        onChange={() => toggleConcern(c)}
                      />
                      <span className="text-sm">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Severity */}
              <div className="space-y-1">
                <Label>Severity</Label>
                <Select value={severity} onValueChange={setSeverity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {["Normal", "MEDIUM", "Emergency"].map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <Button type="submit" className="flex-1">
                  Submit
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setDescription("");
                    setPhone("");
                    setLevel("GENERAL");
                    setMeetingType(null);
                    setMeetingLocation("");
                    setTiming("");
                    setConcerns([]);
                    setSeverity("");
                    setSubmitted(null);
                  }}
                >
                  Reset
                </Button>
              </div>
            </form>
            {/* === FORM END === */}
          </Card>
        )}
      </div>
      <div className="hidden lg:flex w-72 flex-shrink-0 items-center mb-20   justify-center min-h-screen">
      <HelplineSidebar />
      </div>
    </div>

    <Footer />
  </div>
);

}
