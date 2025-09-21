import React, { useEffect, useMemo, useState } from "react";
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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { useAuth } from "@clerk/clerk-react";

export default function AddCounsellorPage() {
  const { getToken } = useAuth();

  type Counsellor = {
    id: string | number;
    firstName: string;
    lastName: string;
    email: string;
  };

  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const apiBaseUrl = useMemo(() => {
    return "https://sih-project-1-1.onrender.com/api/admin";
  }, []);

  const fetchCounsellors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch(`${apiBaseUrl}/getAllCounsellors`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to fetch counsellors");
      }
      setCounsellors(data.counsellors || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch counsellors");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCounsellors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setError(null);
    try {
      const token = await getToken();
      const res = await fetch(`${apiBaseUrl}/addCounsellor`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to add counsellor");
      }
      setFormData({ firstName: "", lastName: "", email: "" });
      await fetchCounsellors();
    } catch (err: any) {
      setError(err.message || "Failed to add counsellor");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar/>
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-6 flex-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Counsellors</h1>
            <p className="text-sm text-muted-foreground">Manage registered counsellors.</p>
          </div>
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="rounded-full w-10 h-10 text-xl font-bold" aria-label="Add counsellor">+</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Add Counsellor</DrawerTitle>
                <DrawerDescription>Enter the counsellor's details and save.</DrawerDescription>
              </DrawerHeader>
              <div className="p-6">
                <Card className="shadow-md rounded-2xl max-w-lg mx-auto w-full">
                  <CardContent className="p-6 space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                      </div>
                      <Button type="submit" className="w-full rounded-2xl" disabled={isAdding}>
                        {isAdding ? "Adding..." : "Add Counsellor"}
                      </Button>
                    </form>
                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}
                  </CardContent>
                </Card>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        <Card className="shadow-md rounded-2xl overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 text-sm text-muted-foreground">Loading counsellors...</div>
            ) : error ? (
              <div className="p-6 text-sm text-destructive">{error}</div>
            ) : counsellors.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">No counsellors found.</div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[160px]">First Name</TableHead>
                      <TableHead className="min-w-[160px]">Last Name</TableHead>
                      <TableHead className="min-w-[260px]">Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {counsellors.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell>{c.firstName}</TableCell>
                        <TableCell>{c.lastName}</TableCell>
                        <TableCell>{c.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <Footer/>
    </div>
  );
}
