import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAuth, useUser } from "@clerk/clerk-react";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  clerkId: string;
}

interface Ticket {
  id: number;
  studentId: number;
  student: Student;
  description: string;
  severity: string;
  status: string;
  createdAt: string;
  timing: string;
}

export default function BlockStudentPage() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [counseledStudents, setCounseledStudents] = useState<Ticket[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchCounseledStudents();
  }, []);

  const fetchCounseledStudents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const token = await getToken();
      const { data } = await axios.post(
        "https://sih-project-1-9wgj.onrender.com/api/ticket/get_counsellor_students",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCounseledStudents(data.tickets || []);
    } catch (error) {
      console.error("Error fetching counseled students:", error);
      toast({
        title: "Error",
        description: "Failed to load counseled students. Please try again.",
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
        { email, role: "student", reason },
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-8 mt-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Block Student Request
              </h1>
              <p className="text-muted-foreground">
                Review your counseled students and send block requests if needed.
              </p>
            </div>

            {/* Students List */}
            <Card className="shadow-md rounded-2xl w-full">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Your Counseled Students</h2>

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
                ) : counseledStudents.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground">
                    No counseled students found.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {counseledStudents.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="p-4 border rounded-lg hover:bg-muted/30 transition"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">
                              {ticket.student.firstName} {ticket.student.lastName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {ticket.student.email}
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
                                {ticket.status}
                              </Badge>
                            </div>
                            <p className="text-sm mt-2">{ticket.description}</p>
                            <div className="text-xs text-muted-foreground mt-2">
                              <span>Created: {formatDate(ticket.createdAt)}</span>
                              <span className="ml-4">
                                Appointment: {formatDate(ticket.timing)}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBlockRequest(ticket.student.email, "Blocked for inappropriate behavior")}
                          >
                            Block Student
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