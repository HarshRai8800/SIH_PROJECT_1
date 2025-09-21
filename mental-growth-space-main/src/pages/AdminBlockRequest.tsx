import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface BlockRequest {
  id: string;
  name: string;
  email: string;
  role: "student" | "counsellor";
  age?: number;
}

export default function AdminBlockRequestPage() {
  const [selection, setSelection] = useState<"student" | "counsellor" | null>(
    null
  );
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [blockRequests, setBlockRequests] = useState<BlockRequest[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch block requests from the backend
  const fetchBlockRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/getblockrequests", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBlockRequests(data);
      } else {
        console.error("Failed to fetch block requests");
        toast({
          title: "Error",
          description: "Failed to fetch block requests",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error fetching block requests:", error);
      toast({
        title: "Error",
        description: "Error fetching block requests",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlockRequests();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = selection === "student" 
        ? "/api/admin/blockStudent" 
        : "/api/admin/blockCounsellor";
      
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${selection} blocked successfully!`,
        });
        setFormData({ name: "", email: "" });
        setSelection(null);
        fetchBlockRequests(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || `Failed to block ${selection}`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(`Error blocking ${selection}:`, error);
      toast({
        title: "Error",
        description: `Failed to block ${selection}`,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (request: BlockRequest) => {
    try {
      const endpoint = request.role === "student" 
        ? "/api/admin/blockStudent" 
        : "/api/admin/blockCounsellor";
      
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: request.id }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: `${request.role} block request deleted successfully!`,
        });
        fetchBlockRequests(); // Refresh the list
      } else {
        const errorData = await response.json();
        toast({
          title: "Error",
          description: errorData.message || `Failed to delete block request`,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error deleting block request:", error);
      toast({
        title: "Error",
        description: "Failed to delete block request",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 p-6 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">Admin Block Request Management</h1>
        
        {!selection ? (
          // Step 1: Choose Student or Counsellor
          <Card className="shadow-md rounded-2xl w-full max-w-md mb-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-center mb-4">
                Create New Block
              </h2>
              <div className="flex gap-6 justify-center">
                <Button
                  className="rounded-2xl px-6"
                  onClick={() => setSelection("student")}
                >
                  Block Student
                </Button>
                <Button
                  className="rounded-2xl px-6"
                  onClick={() => setSelection("counsellor")}
                >
                  Block Counsellor
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          // Step 2: Show block form
          <Card className="shadow-md rounded-2xl w-full max-w-md mb-8">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-semibold text-center mb-4">
                Block {selection === "student" ? "Student" : "Counsellor"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setSelection(null)}
                  >
                    Back
                  </Button>
                  <Button type="submit" variant="destructive">
                    Block {selection}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Display block requests in a table */}
        <div className="w-full max-w-4xl">
          <h2 className="text-xl font-semibold mb-4">Block Requests</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <p>Loading block requests...</p>
            </div>
          ) : blockRequests.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium capitalize">{request.role}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleDelete(request)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-center p-4 border rounded-lg">No block requests found.</p>
          )}
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
}
