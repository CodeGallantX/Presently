"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plug } from "lucide-react"; // General integration icon
import { FaSlack, FaWhatsapp } from "react-icons/fa";
import { SiGoogleSheets, SiGooglecalendar } from "react-icons/si";

// Mock data for integrations
const integrations = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    icon: <SiGoogleSheets className="w-5 h-5" />,
    description: "Sync attendance data to Google Sheets.",
    status: "Disconnected",
  },
  {
    id: "slack",
    name: "Slack",
    icon: <FaSlack className="w-5 h-5" />,
    description: "Receive session notifications in Slack.",
    status: "Disconnected",
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <FaWhatsapp className="w-5 h-5" />,
    description: "Get attendance reminders via WhatsApp.",
    status: "Connected",
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    icon: <SiGooglecalendar className="w-5 h-5" />,
    description: "Add timetable entries to your Google Calendar.",
    status: "Disconnected",
  },
];

export default function AppsAndIntegrations({ onBack }) {
  const handleConnectDisconnect = (id, currentStatus) => {
    alert(`Attempting to ${currentStatus === "Connected" ? "disconnect from" : "connect to"} ${id}`);
    // In a real app, this would trigger an OAuth flow or API call
  };

  return (
    <Card className="w-full">
      <CardHeader className="relative">
        <CardTitle className="flex items-center gap-2">
          <Plug className="w-5 h-5" /> Apps & Integrations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Integrate your account with third-party applications for enhanced functionality.
        </p>

        {integrations.map((app) => (
          <div key={app.id}>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                {app.icon}
                <div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </div>
              <Button
                variant={app.status === "Connected" ? "outline" : "default"}
                onClick={() => handleConnectDisconnect(app.id, app.status)}
              >
                {app.status === "Connected" ? "Disconnect" : "Connect"}
              </Button>
            </div>
            <Separator className="last:hidden" /> {/* Hide separator for the last item */}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
