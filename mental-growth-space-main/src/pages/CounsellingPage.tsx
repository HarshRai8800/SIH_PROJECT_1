import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
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

const counsellorList = [
  "John Doe",
  "Jane Smith",
  "Michael Johnson",
  "Emily Davis",
  "Chris Wilson",
];

export default function CounsellingForm() {
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [level, setLevel] = useState("GENERAL");
  const [meetingType, setMeetingType] = useState<"online" | "offline" | null>(
    null
  );
  const {user} = useUser();
  const{ getToken }= useAuth();
  const [meetingLocation, setMeetingLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [counsellor, setCounsellor] = useState("");
  const [mode, setMode] = useState<"ai" | "custom" | null>(null);
  const [submitted, setSubmitted] = useState<null | any>(null);

  const [query, setQuery] = useState("");
  const filteredCounsellors = counsellorList.filter((c) =>
    c.toLowerCase().includes(query.toLowerCase())
  );

  const toggleConcern = (value: string) => {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  };

  const validate = () => {
    if (!description.trim()) return { ok: false, message: "Description required" };
    if (!phone.trim()) return { ok: false, message: "Phone required" };
    if (!timing) return { ok: false, message: "Timing required" };
    if (concerns.length === 0) return { ok: false, message: "Select concerns" };
    if (!severity) return { ok: false, message: "Severity required" };
    return { ok: true };
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    const token =await getToken();
    const payload = {
      discription:description,
      phone,
      level,
      meetingType,
      meetingLocation: meetingType === "offline" ? meetingLocation : null,
      timing,
      concerns,
      severity,
      counsellor: mode === "custom" ? counsellor : "AI Suggested",
      createdAt: new Date().toISOString(),
    };

 try {
  console.log("inside submit"+` ${token}`)
   const {data}= await axios.post(
   "http://localhost:5000/api/ticket/create_ticket",
   {
    clerkId:user.id,
     discription:description,
     meetingLocation:meetingType==="offline"?meetingLocation:undefined,
     timing,
     level,
     conserns:concerns,
     severityOfCase:severity,
   },
   {
     headers: {
       Authorization: `Bearer ${token}`, // your token here
     },
   }
 );
      console.log(data)
     setSubmitted({ success: true, payload });
 } catch (error) {
  
 }
  };

  return (
    <div className="bg-background min-h-screen mt-16 flex flex-col bg-slate-200">
      <Navbar />

      <div className="flex flex-1 px-4 py-6 gap-6">
        {/* Form */}
        <div className="flex-1">
          <Card className="p-8 max-w-3xl mx-auto">
            {/* AI / Custom buttons */}
            <div className="flex gap-4 mb-6">
              <Button
                type="button"
                variant={mode === "ai" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setMode("ai");
                  setDescription("Give me detailed descriptiomn of your problem expaining all yours issues .");
                  setPhone("9876543210");
                  setLevel("Normal");
                  setMeetingType("online");
                  setTiming(new Date().toISOString().slice(0, 16));
                  setConcerns(["ANXIETY_STRESS"]);
                  setSeverity("Medium");
                  setCounsellor("");
                }}
              >
                AI Counsellor Selection
              </Button>
              <Button
                type="button"
                variant={mode === "custom" ? "default" : "outline"}
                className="flex-1"
                onClick={() => {
                  setMode("custom");
                  setDescription("");
                  setPhone("");
                  setLevel("Normal");
                  setMeetingType(null);
                  setTiming("");
                  setConcerns([]);
                  setSeverity("");
                  setCounsellor("");
                }}
              >
                Custom Counsellor Selection
              </Button>
            </div>

            {mode === "custom" && (
              <div className="mb-4 relative">
                <Label>Choose Counsellor</Label>
                <Input
                  type="text"
                  placeholder="Type to filter..."
                  value={counsellor}
                  onChange={(e) => setCounsellor(e.target.value)}
                />
                {counsellor &&
                  filteredCounsellors.length > 0 &&
                  filteredCounsellors.map((c) => (
                    <div
                      key={c}
                      onClick={() => setCounsellor(c)}
                      className="absolute bg-white border w-full px-4 py-2 cursor-pointer hover:bg-gray-100 z-50"
                    >
                      {c}
                    </div>
                  ))}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Description */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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

              {/* Online / Offline toggle */}
              <div className="space-y-2">
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

              {/* Meeting Location (only offline) */}
              {meetingType === "offline" && (
                <div className="space-y-2">
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
          <div className="space-y-2">
  <Label>
    Date & Time <span className="text-red-500">*</span>
  </Label>
  <Input
    type="datetime-local"
    value={timing}
    onChange={(e) => {
      const value = e.target.value;
      setTiming(value);

      const date = new Date(value);
      const hours = date.getHours();

      if (hours < 10 || hours > 16) {
        toast("Timing invalid", {
          description: "Counseller timing should be between 9Am to 4 Pm",
        })
        setTiming(""); 
      }
    }}
    required
  />
</div>

              {/* Concerns */}
              <div className="space-y-2">
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
              <div className="space-y-2">
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
                    setLevel("Normal");
                    setMeetingType(null);
                    setMeetingLocation("");
                    setTiming("");
                    setConcerns([]);
                    setSeverity("");
                    setCounsellor("");
                    setMode(null);
                    setSubmitted(null);
                  }}
                >
                  Reset
                </Button>
              </div>

              {submitted && (
                <Card
                  className={`p-4 mt-4 ${
                    submitted.success ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  {submitted.success ? (
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(submitted.payload, null, 2)}
                    </pre>
                  ) : (
                    <p className="text-red-700">{submitted.message}</p>
                  )}
                </Card>
              )}
            </form>
          </Card>
        </div>

        {/* Right-side search bar */}
        <div className="w-64 flex-shrink-0 ">
          <Card className="p-4 sticky top-24 bg-green-100">
            <Label>Search Counsellors</Label>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter..."
            />
            <div className="mt-2 max-h-40 overflow-y-auto">
              {query
                ? filteredCounsellors.map((c) => (
                    <div key={c} className="py-1 px-2 hover:bg-gray-100 cursor-pointer">
                      {c}
                    </div>
                  ))
                : counsellorList.map((c) => (
                    <div key={c} className="py-1 px-2 text-gray-500 cursor-default">
                      {c}
                    </div>
                  ))}
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
