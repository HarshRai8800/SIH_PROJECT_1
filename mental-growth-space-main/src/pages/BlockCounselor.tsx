import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

interface Counselor {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
}

interface Ticket {
  id: number;
  counsellorId: number;
  counsellor: Counselor;
  description: string;
  severity: string;
  status: string;
  createdAt: string;
  timing: string;
}

export default function BlockCounselorPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [counselors, setCounselors] = useState<Ticket[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCounselors();
  }, []);

  const fetchCounselors = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.post(
        "https://sih-project-1-1.onrender.com/api/ticket/get_student_counsellors",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCounselors(data.tickets || []);
    } catch (error) {
      console.error("Error fetching counselors:", error);
      toast({
        title: "Error",
        description: "Failed to load counselors. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBlockRequest = async (email: String, reason: string) => {
    try {
      const token = await getToken();
      await axios.post(
        "https://sih-project-1-1.onrender.com/api/block/blockrequest",
        { email, role: "counsellor", reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: "Success",
        description: "Block request has been sent successfully",
      });
    } catch (error) {
      console.error("Error sending block request:", error);
      toast({
        title: "Error",
        description: "Failed to send block request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 mt-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 pt-6">Report Counselor</h1>
            <p className="text-muted-foreground mb-8">
              If you've experienced inappropriate behavior or have concerns about a counselor,
              you can report them here. Your report will be reviewed by administrators.
            </p>

            <Card className="shadow-md rounded-2xl mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">My Counselors</h2>
                 {loading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="animate-pulse p-4 border rounded-lg">
                        <div className="h-5 bg-muted/40 rounded w-1/4 mb-2"></div>
                        <div className="h-4 bg-muted/40 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-muted/40 rounded w-1/2"></div>
                      </div>
                    ))}
                  </div>
                ) : counselors.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No counselors found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {counselors.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 border rounded-lg hover:bg-muted/30 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {ticket.counsellor.firstName} {ticket.counsellor.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {ticket.counsellor.email}
                            </p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="outline">
                                Ticket #{ticket.id}
                              </Badge>
                              <Badge
                                variant={
                                  ticket.severity === "HIGH"
                                    ? "destructive"
                                    : ticket.severity === "MEDIUM"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                {ticket.severity}
                              </Badge>
                              <Badge
                                variant={
                                  ticket.status === "OPEN"
                                    ? "destructive"
                                    : ticket.status === "IN_PROGRESS"
                                      ? "secondary"
                                      : "outline"
                                }
                              >
                                Status: {ticket.status}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBlockRequest(ticket.counsellor.email, "Reported for inappropriate behavior")}
                          >
                            Report Counselor
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}