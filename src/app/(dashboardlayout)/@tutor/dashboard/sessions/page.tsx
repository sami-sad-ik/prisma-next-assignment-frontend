/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  completeSession,
  getTutorSessions,
} from "@/app/modules/booking.service";
import { format } from "date-fns";
import CompleteSessionModal from "@/components/modal/CompleteSessionModal";

export default function TutorSessionsPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );
  const [loadingAction, setLoadingAction] = useState(false);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const { data } = await getTutorSessions();
        setSessions(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleCompleteSession = async () => {
    if (!selectedSessionId) return;

    try {
      setLoadingAction(true);

      await completeSession(selectedSessionId);

      setSessions((prev) =>
        prev.map((s) =>
          s.id === selectedSessionId ? { ...s, status: "COMPLETED" } : s,
        ),
      );

      setCompleteModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAction(false);
    }
  };
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Teaching Sessions</h1>

      {sessions.map((session) => (
        <Card key={session.id} className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{session.student.name}</CardTitle>

              <Badge
                variant={
                  session.status === "CONFIRMED"
                    ? "default"
                    : session.status === "COMPLETED"
                      ? "secondary"
                      : "destructive"
                }>
                {session.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              {session.student.email}
            </p>

            <p className="text-sm">
              {format(new Date(session.availability.startTime), "dd MMM yyyy")}{" "}
              • {format(new Date(session.availability.startTime), "HH:mm")} -{" "}
              {format(new Date(session.availability.endTime), "HH:mm")}
            </p>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              {session.status === "CONFIRMED" && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={loading}
                    onClick={() => {
                      setSelectedSessionId(session.id);
                      setCompleteModalOpen(true);
                    }}>
                    Mark Completed
                  </Button>

                  <Button size="sm" variant="destructive">
                    Cancel
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <CompleteSessionModal
        open={completeModalOpen}
        onOpenChange={setCompleteModalOpen}
        onConfirm={handleCompleteSession}
        loading={loadingAction}
      />
    </div>
  );
}
