import React, { useState } from "react";

// JSON data embedded in the page
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
      helperText: "Select your preferred date and time for the counselling session."
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
      initialMessage: "Fill the form and click submit to create a counselling ticket.",
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
    <div className="min-h-screen bg-gray-50 flex items-start justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >
        <h1 className="text-2xl font-semibold">{data.form.title}</h1>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            {data.form.description.label}{" "}
            <span className="text-red-500">{data.form.description.required}</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            required
            className="mt-2 w-full rounded-xl border-gray-300 shadow-sm p-3"
            placeholder={data.form.description.placeholder}
          />
          <p className="mt-1 text-xs text-gray-500">
            {data.form.description.helperText}
          </p>
        </div>

        {/* Status + Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label htmlFor="status" className="block text-sm font-medium">
              {data.form.status.label}
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-2"
            >
              {data.form.status.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{data.form.status.helperText}</p>
          </div>

          {/* Level */}
          <div>
            <label htmlFor="level" className="block text-sm font-medium">
              {data.form.level.label}
            </label>
            <select
              id="level"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-2"
            >
              {data.form.level.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{data.form.level.helperText}</p>
          </div>
        </div>

        {/* Meeting Location */}
        <div>
          <label htmlFor="meetingLocation" className="block text-sm font-medium">
            {data.form.meetingLocation.label}{" "}
            <span className="text-gray-400">{data.form.meetingLocation.optional}</span>
          </label>
          <input
            id="meetingLocation"
            value={meetingLocation}
            onChange={(e) => setMeetingLocation(e.target.value)}
            type="text"
            placeholder={data.form.meetingLocation.placeholder}
            className="mt-2 w-full rounded-lg border-gray-300 p-2"
          />
          <p className="text-xs text-gray-500 mt-1">
            {data.form.meetingLocation.helperText}
          </p>
        </div>

        {/* Timing */}
        <div>
          <label htmlFor="timing" className="block text-sm font-medium">
            {data.form.timing.label}{" "}
            <span className="text-red-500">{data.form.timing.required}</span>
          </label>
          <input
            id="timing"
            required
            value={timing}
            onChange={(e) => setTiming(e.target.value)}
            type="datetime-local"
            className="mt-2 w-full rounded-lg border-gray-300 p-2"
          />
          <p className="text-xs text-gray-500 mt-1">{data.form.timing.helperText}</p>
        </div>

        {/* Concerns */}
        <fieldset>
          <legend className="text-sm font-medium">
            {data.form.concerns.legend}{" "}
            <span className="text-red-500">{data.form.concerns.required}</span>
          </legend>
          <p className="text-xs text-gray-500 mb-2">{data.form.concerns.helperText}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {data.form.concerns.options.map((c) => (
              <label key={c} className="inline-flex items-center space-x-2 border p-2">
                <input
                  type="checkbox"
                  checked={concerns.includes(c)}
                  onChange={() => toggleConcern(c)}
                />
                <span className="text-sm">{c}</span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* Severity + Counsellor Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Severity */}
          <div>
            <label htmlFor="severity" className="block text-sm font-medium">
              {data.form.severity.label}{" "}
              <span className="text-red-500">{data.form.severity.required}</span>
            </label>
            <select
              id="severity"
              required
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-2"
            >
              <option value="">{data.form.severity.defaultOption}</option>
              {data.form.severity.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">{data.form.severity.helperText}</p>
          </div>

          {/* Counsellor Type */}
          <div>
            <label htmlFor="counsellorType" className="block text-sm font-medium">
              {data.form.counsellorType.label}{" "}
              <span className="text-gray-400">{data.form.counsellorType.optional}</span>
            </label>
            <select
              id="counsellorType"
              value={counsellorType}
              onChange={(e) => setCounsellorType(e.target.value)}
              className="mt-2 block w-full rounded-lg border-gray-300 p-2"
            >
              <option value="">{data.form.counsellorType.defaultOption}</option>
              {data.form.counsellorType.options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {data.form.counsellorType.helperText}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between space-x-4">
          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {data.form.buttons.submit}
          </button>

          <button
            type="button"
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
            className="px-4 py-2 rounded-lg border text-sm"
          >
            {data.form.buttons.reset}
          </button>
        </div>

        {/* Submission Preview */}
        <div className="pt-4">
          {submitted === null ? (
            <p className="text-sm text-gray-500">{data.form.submission.initialMessage}</p>
          ) : submitted.success ? (
            <div className="rounded-lg bg-green-50 p-4 border">
              <h3 className="font-medium">{data.form.submission.successTitle}</h3>
              <p className="text-sm mt-1">{data.form.submission.successDescription}</p>
              <pre className="mt-2 overflow-auto text-xs bg-white p-3 rounded-lg border">
                {JSON.stringify(submitted.payload, null, 2)}
              </pre>
            </div>
          ) : (
            <div className="rounded-lg bg-red-50 p-3 border text-sm text-red-700">
              {submitted.message || data.form.submission.errorMessage}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
