// src/pages/CounsellorProfile.tsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProgressRing } from "@/components/Profile/ProgressRing";
import { useUserProfile } from "@/context/UserProfileContext";

type Counsellor = {
  fullName: string;
  email: string;
  specialization: string;
  yearsExperience: number;
  totalSessions: number;
  activeClients: number;
  satisfactionRate: number;
};

export default function CounsellorProfile() {
  const { profile } = useUserProfile();

  // ✅ combine existing profile with defaults and cast once
  const counsellor = {
    fullName: "Dr. Jane Doe",
    email: "jane.doe@example.com",
    specialization: "Clinical Psychologist",
    yearsExperience: 8,
    totalSessions: 120,
    activeClients: 25,
    satisfactionRate: 92,
    ...profile, // if profile has any matching keys, they override defaults
  } as Counsellor;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Counsellor Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left profile card */}
        <Card className="p-6 flex flex-col items-center">
          <ProgressRing
            progress={counsellor.satisfactionRate}
            size={90}
            strokeWidth={6}
          />
          <h2 className="mt-4 text-xl font-semibold text-foreground">
            {counsellor.fullName}
          </h2>
          <p className="text-muted-foreground">{counsellor.email}</p>
          <p className="text-sm mt-1">{counsellor.specialization}</p>

          <div className="mt-4 text-center">
            <p className="text-2xl font-bold">{counsellor.yearsExperience} yrs</p>
            <p className="text-muted-foreground text-sm">Experience</p>
          </div>

          <Button className="mt-6 w-full">Edit Profile</Button>
        </Card>

        {/* Right-hand stats */}
        <div className="md:col-span-2 grid gap-6">
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Practice Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{counsellor.totalSessions}</p>
                <p className="text-muted-foreground text-sm">Total Sessions</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{counsellor.activeClients}</p>
                <p className="text-muted-foreground text-sm">Active Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{counsellor.satisfactionRate}%</p>
                <p className="text-muted-foreground text-sm">Client Satisfaction</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-4">Upcoming Sessions</h3>
            <p className="text-muted-foreground">
              Fetch upcoming session data from your backend and list them here.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
