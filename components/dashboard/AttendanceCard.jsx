import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, XCircle, Clock } from "lucide-react"; // Icons for status

export function AttendanceCard({ record }) {
  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "Absent":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "Pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800";
      case "Absent":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "";
    }
  };

  return (
    <Card className="mb-4 dashboard-card">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{record.courseName}</CardTitle>
            <p className="text-sm text-muted-foreground">{record.courseCode}</p>
          </div>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full flex items-center gap-1 ${getStatusBadgeClass(record.status)}`}
          >
            {getStatusIcon(record.status)}
            {record.status}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Date: {record.date}</span>
          <span>Time: {record.time}</span>
        </div>
        {record.venue && (
          <p className="text-sm text-muted-foreground">Venue: {record.venue}</p>
        )}
        {record.markedAt && (
          <p className="text-xs text-muted-foreground">
            Marked at {record.markedAt}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
