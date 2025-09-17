import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Navbar from "@/components/Navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer/Footer";
export default function DashboardPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const personalConcerns = [
    { concern: t("Exam Anxiety"), percentage: 60, change: "+5%" },
    { concern: t("Sleep Issues"), percentage: 40, change: "-3%" },
    { concern: t("Academic Pressure"), percentage: 55, change: "+2%" },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background flex flex-col">
        <main className="flex-1">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-24 pb-8 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight">{t("Admin Dashboard")}</h1>
                <p className="text-sm text-muted-foreground">{t("Manage students, counsellors and review requests.")}</p>
              </div>
              {/* Top Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <Button
                  className="rounded-2xl px-6 w-full sm:w-auto"
                  onClick={() => navigate("/admin/add-student")}
                >
                  {t("Add Student")}
                </Button>
                <Button
                  className="rounded-2xl px-6 w-full sm:w-auto"
                  onClick={() => navigate("/admin/add-counsellor")}
                >
                  {t("Add Counsellor")}
                </Button>
              </div>
            </div>

            {/* Main Section */}
            <Card className="shadow-md rounded-2xl overflow-hidden">
              <CardHeader>
                <CardTitle>{t("Overview")}</CardTitle>
                <CardDescription>{t("Quick actions and a visual overview.")}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-8">
                <Card className="card-gradient p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-6">
                    {t("My Top Concerns")}
                  </h3>
                  <div className="space-y-4">
                    {personalConcerns.map((concern) => (
                      <div key={concern.concern} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {concern.concern}
                          </span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">
                              {concern.percentage}%
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-xs ${concern.change.startsWith('+') ? 'text-wellness' : 'text-destructive'}`}
                            >
                              {concern.change}
                            </Badge>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-500"
                            style={{ width: `${concern.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Block Request Button */}
                <div className="flex md:block justify-center">
                  <div className="space-y-3 w-full md:w-auto max-w-sm">
                    <p className="text-sm text-muted-foreground text-center md:text-left">
                      {t("Handle flagged items and access control requests.")}
                    </p>
                    <Button
                      variant="destructive"
                      className="rounded-2xl px-6 py-3 w-full md:w-auto"
                      onClick={() => navigate("/block-request")}
                    >
                      {t("Block Request")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}