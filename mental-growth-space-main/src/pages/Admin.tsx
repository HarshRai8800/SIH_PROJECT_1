import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
          <Navbar/>
    <div className="p-6 space-y-6">
      {/* Top Buttons */}
      <div className="flex gap-4">
        <Button
          className="rounded-2xl px-6"
          onClick={() => navigate("/add-student")}
        >
          Add Student
        </Button>
        <Button
          className="rounded-2xl px-6"
          onClick={() => navigate("/add-counsellor")} // ✅ navigate
        >
          Add Counsellor
        </Button>
      </div>

      {/* Main Section */}
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            {/* Big Image */}
            <img
              src="/data.jpg"
              alt="Data"
              className="rounded-xl shadow-md w-full md:w-2/3"
            />

            {/* Block Request Button */}
            <div className="flex justify-center md:justify-start">
              <Button
  variant="destructive"
  className="rounded-2xl px-6 py-3"
  onClick={() => navigate("/block-request")}
>
  Block Request
</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      <Footer/>
    </div>
  );
}
