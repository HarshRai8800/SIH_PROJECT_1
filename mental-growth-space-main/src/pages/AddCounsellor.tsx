import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

export default function AddCounsellor() {
  const [counsellors, setCounsellors] = useState<
    { name: string; email: string; phone: string }[]
  >([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCounsellors([...counsellors, formData]);
    setFormData({ name: "", email: "", phone: "" });
  };

  return (
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar/>
    <div className="p-6">
      {/* Drawer Trigger at Top Right */}
      <div className="flex justify-end mb-6">
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="rounded-full w-10 h-10 text-xl font-bold">+</Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Registered Counsellors</DrawerTitle>
              <DrawerDescription>List of counsellors you added</DrawerDescription>
            </DrawerHeader>
            <div className="p-4 space-y-3">
              {counsellors.length === 0 ? (
                <p className="text-gray-500">No counsellors registered yet.</p>
              ) : (
                counsellors.map((c, idx) => (
                  <Card key={idx} className="shadow-md">
                    <CardContent className="p-3">
                      <p><strong>Name:</strong> {c.name}</p>
                      <p><strong>Email:</strong> {c.email}</p>
                      <p><strong>Phone:</strong> {c.phone}</p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Form */}
      <Card className="shadow-md rounded-2xl max-w-md mx-auto">
        <CardContent className="p-6 space-y-4">
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
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <Button type="submit" className="w-full rounded-2xl">
              Register Counsellor
            </Button>
          </form>
        </CardContent>
      </Card>
      </div>
      <Footer/>
    </div>
  );
}
