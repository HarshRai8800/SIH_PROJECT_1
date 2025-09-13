import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';

const textData = {
  form: {
    title: "Counselling Form",
    description: {
      label: "Description",
      required: "Required",
      placeholder: "Write a detailed description of your issue or problem...",
      helperText:
        "Please provide as much detail as possible so the counsellor can better assist you."
    },
    status: {
      label: "Status",
      options: ["OPEN", "CLOSED", "PENDING"],
      helperText: "Defines the current state of the ticket."
    },
    level: {
      label: "Level",
      options: ["GENERAL", "URGENT", "CRITICAL"],
      helperText: "Indicates the priority level of the ticket."
    },
    meetingLocation: {
      label: "Meeting Location",
      optional: "(Optional)",
      placeholder: "e.g., Room 202 or Google Meet link",
      helperText:
        "You can specify a location for the counselling session if needed."
    },
    timing: {
      label: "Timing",
      required: "Required",
      helperText:
        "Select your preferred date and time for the counselling session."
    },
    concerns: {
      legend: "Concerns",
      required: "Required",
      helperText: "Select one or more psychological concerns you are facing.",
      options: ["ANXIETY", "DEPRESSION", "STRESS", "ACADEMIC", "RELATIONSHIP"]
    },
    severity: {
      label: "Severity",
      required: "Required",
      defaultOption: "Select severity",
      helperText: "Defines the intensity/seriousness of the issue.",
      options: ["LOW", "MEDIUM", "HIGH"]
    },
    counsellorType: {
      label: "Counsellor Type",
      optional: "(Optional)",
      defaultOption: "Select counsellor type",
      helperText: "Choose what type of counsellor you prefer.",
      options: ["PSYCHOLOGIST", "THERAPIST", "MENTOR"]
    },
    buttons: {
      submit: "Submit Ticket",
      reset: "Reset Form"
    },
    submission: {
      initialMessage:
        "Fill the form and click submit to create a counselling ticket.",
      successTitle: "Form submitted successfully!",
      successDescription:
        "Your ticket has been created with the following details:",
      errorMessage: "There was an error submitting the form. Please try again."
    }
  }
};

type SubmissionResult =
  | { success: true; payload: Record<string, unknown> }
  | { success: false; message: string }
  | null;

export default function CounsellingForm() {
  const data = textData;

  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(data.form.status.options[0]);
  const [level, setLevel] = useState(data.form.level.options[0]);
  const [meetingLocation, setMeetingLocation] = useState("");
  const [timing, setTiming] = useState("");
  const [concerns, setConcerns] = useState<string[]>([]);
  const [severity, setSeverity] = useState("");
  const [counsellorType, setCounsellorType] = useState("");
  const [submitted, setSubmitted] = useState<SubmissionResult>(null);

  function toggleConcern(value: string) {
    setConcerns((prev) =>
      prev.includes(value) ? prev.filter((c) => c !== value) : [...prev, value]
    );
  }

  function validate() {
    if (!description.trim())
      return { ok: false, message: `${data.form.description.label} is required.` };
    if (!timing)
      return { ok: false, message: `${data.form.timing.label} is required.` };
    if (concerns.length === 0)
      return { ok: false, message: `Select at least one ${data.form.concerns.legend}.` };
    if (!severity)
      return { ok: false, message: `${data.form.severity.label} is required.` };
    return { ok: true };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = validate();
    if (!("ok" in v) || !v.ok) {
      setSubmitted({ success: false, message: v.message ?? "Invalid form" });
      return;
    }

    const payload = {
      description: description.trim(),
      status,
      level,
      meetingLocation: meetingLocation.trim() || null,
      timing,
      concerns,
      severity,
      counsellorType: counsellorType || null,
      createdAt: new Date().toISOString()
    };
    setSubmitted({ success: true, payload });
  }

  return (
     <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
    
    <div className="min-h-screen flex items-center justify-center py-10 px-4 bg-background">
      <Card className="max-w-3xl w-full p-8 card-gradient">
        <h1 className="text-2xl font-bold text-foreground mb-6">{data.form.title}</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              {data.form.description.label}{" "}
              <span className="text-red-500">{data.form.description.required}</span>
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={data.form.description.placeholder}
              className="min-h-[120px]"
              required
            />
            <p className="text-xs text-muted-foreground">
              {data.form.description.helperText}
            </p>
          </div>

          {/* Status + Level */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{data.form.status.label}</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {data.form.status.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{data.form.status.helperText}</p>
            </div>
            <div className="space-y-2">
              <Label>{data.form.level.label}</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {data.form.level.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{data.form.level.helperText}</p>
            </div>
          </div>

          {/* Meeting Location */}
          <div className="space-y-2">
            <Label htmlFor="meetingLocation">
              {data.form.meetingLocation.label}{" "}
              <span className="text-muted-foreground">{data.form.meetingLocation.optional}</span>
            </Label>
            <Input
              id="meetingLocation"
              value={meetingLocation}
              onChange={(e) => setMeetingLocation(e.target.value)}
              placeholder={data.form.meetingLocation.placeholder}
            />
            <p className="text-xs text-muted-foreground">
              {data.form.meetingLocation.helperText}
            </p>
          </div>

          {/* Timing */}
          <div className="space-y-2">
            <Label htmlFor="timing">
              {data.form.timing.label}{" "}
              <span className="text-red-500">{data.form.timing.required}</span>
            </Label>
            <Input
              id="timing"
              type="datetime-local"
              value={timing}
              onChange={(e) => setTiming(e.target.value)}
              required
            />
            <p className="text-xs text-muted-foreground">{data.form.timing.helperText}</p>
          </div>

          {/* Concerns */}
          <div className="space-y-2">
            <Label>{data.form.concerns.legend} <span className="text-red-500">{data.form.concerns.required}</span></Label>
            <p className="text-xs text-muted-foreground">{data.form.concerns.helperText}</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {data.form.concerns.options.map((c) => (
                <label key={c} className="flex items-center space-x-2 border rounded-md p-2 cursor-pointer">
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

          {/* Severity + Counsellor Type */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{data.form.severity.label}</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder={data.form.severity.defaultOption} />
                </SelectTrigger>
                <SelectContent>
                  {data.form.severity.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{data.form.severity.helperText}</p>
            </div>
            <div className="space-y-2">
              <Label>{data.form.counsellorType.label} <span className="text-muted-foreground">{data.form.counsellorType.optional}</span></Label>
              <Select value={counsellorType} onValueChange={setCounsellorType}>
                <SelectTrigger>
                  <SelectValue placeholder={data.form.counsellorType.defaultOption} />
                </SelectTrigger>
                <SelectContent>
                  {data.form.counsellorType.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">{data.form.counsellorType.helperText}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <Button type="submit" className="flex-1">{data.form.buttons.submit}</Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => {
                setDescription("");
                setStatus(data.form.status.options[0]);
                setLevel(data.form.level.options[0]);
                setMeetingLocation("");
                setTiming("");
                setConcerns([]);
                setSeverity("");
                setCounsellorType("");
                setSubmitted(null);
              }}
            >
              {data.form.buttons.reset}
            </Button>
          </div>

          {/* Submission Preview */}
          <div className="pt-4">
            {submitted === null ? (
              <p className="text-sm text-muted-foreground">{data.form.submission.initialMessage}</p>
            ) : submitted.success ? (
              <Card className="p-4 bg-green-50 border-green-200">
                <h3 className="font-semibold">{data.form.submission.successTitle}</h3>
                <p className="text-sm text-muted-foreground">{data.form.submission.successDescription}</p>
                <pre className="mt-2 p-3 bg-white border rounded-lg text-xs overflow-auto">
                  {JSON.stringify(submitted.payload, null, 2)}
                </pre>
              </Card>
            ) : (
              <Card className="p-3 bg-red-50 border-red-200 text-sm text-red-700">
                {submitted.message || data.form.submission.errorMessage}
              </Card>
            )}
          </div>
        </form>
      </Card>
    </div>
      <Footer />
    </div>
  );
}


