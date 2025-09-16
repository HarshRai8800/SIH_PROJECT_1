import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function BlockRequestPage() {
  const [selection, setSelection] = useState<"student" | "counsellor" | null>(
    null
  );
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Blocking ${selection}:`, formData);
    alert(`${selection} blocked successfully!`);
    setFormData({ name: "", email: "" });
    setSelection(null); // Reset after submit
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 p-6 flex flex-col items-center justify-center">
        {!selection ? (
          // Step 1: Choose Student or Counsellor
          <div className="flex gap-6">
            <Button
              className="rounded-2xl px-6"
              onClick={() => setSelection("student")}
            >
              Student
            </Button>
            <Button
              className="rounded-2xl px-6"
              onClick={() => setSelection("counsellor")}
            >
              Counsellor
            </Button>
          </div>
        ) : (
          // Step 2: Show block form
          <Card className="shadow-md rounded-2xl w-full max-w-md">
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
      </div>
      <Footer />
    </div>
  );
}
