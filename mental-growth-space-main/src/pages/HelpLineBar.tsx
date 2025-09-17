import { Card } from "@/components/ui/card";
import { Phone, Info } from "lucide-react";

export default function HelplineSidebar() {
  const helplines = [
    { name: "National Mental Health Helpline", number: "1800-599-0019" },
    { name: "Childline India", number: "1098" },
    { name: "Women Helpline", number: "181" },
    { name: "Suicide Prevention", number: "022-27546669" },
    { name: "Emergency Ambulance", number: "102" },
  ];

  return (
    <div className="hidden lg:flex flex-col flex-shrink-0 w-64">
      <Card className="flex flex-col justify-between h-[95vh] p-5 bg-gradient-to-b from-blue-50 via-green-50 to-white shadow-md rounded-xl border border-blue-100">
        
        {/* Header */}
        <h2 className="text-lg font-semibold text-blue-700 mb-4 text-center">
          📞 Helpline Numbers
        </h2>

        {/* Helplines */}
        <div className="space-y-3 overflow-y-auto pr-1">
          {helplines.map((h, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-white shadow-sm hover:shadow-md hover:bg-blue-50 transition"
            >
              <div className="flex-1">
                <p className="text-xs font-medium text-blue-800">{h.name}</p>
                <p className="text-green-600 font-semibold text-sm">{h.number}</p>
              </div>
              <Phone className="h-4 w-4 text-green-500" />
            </div>
          ))}
        </div>

        {/* Subtle extra info */}
        <div className="mt-5 space-y-2 text-xs text-blue-700">
          <div className="flex items-start space-x-2">
            <Info className="h-3 w-3 text-green-500 mt-0.5" />
            <p className="leading-snug">
              Available <span className="font-semibold">24×7</span>, toll-free and confidential.
            </p>
          </div>

          <div className="flex items-start space-x-2">
            <Info className="h-3 w-3 text-green-500 mt-0.5" />
            <p className="leading-snug">
              Trained counselors ready to support you anytime.
            </p>
          </div>

          <p className="text-center text-green-600 italic mt-3">
            “You are not alone.”
          </p>
        </div>
      </Card>
    </div>
  );
}
