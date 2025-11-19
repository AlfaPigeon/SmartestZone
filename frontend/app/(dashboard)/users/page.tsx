import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Activity, Smartphone, Watch } from "lucide-react";

export default async function UsersPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data - replace with real data from your backend
  const users = [
    {
      id: "u1",
      name: "Sarah Johnson",
      role: "Patient",
      room: "Room 204",
      status: "active",
      assignedDevices: 5,
      wearables: [
        { type: "SmartWatch", name: "Apple Watch Series 9" },
      ],
      mobileDevices: [
        { type: "iPhone", name: "iPhone 15 Pro" },
      ],
      metrics: {
        heartRate: "72 bpm",
        steps: "8,234",
        fallsDetected: 0,
        lastAlert: "None",
      },
      eventCallbacks: [
        { event: "Fall Detected", action: "Alert Medical Staff", enabled: true },
        { event: "Heart Rate Spike", action: "Send Notification", enabled: true },
      ],
    },
    {
      id: "u2",
      name: "Mike Chen",
      role: "Patient",
      room: "Room 307",
      status: "active",
      assignedDevices: 4,
      wearables: [
        { type: "FitBit", name: "Fitbit Charge 6" },
      ],
      mobileDevices: [
        { type: "Android", name: "Samsung Galaxy S24" },
      ],
      metrics: {
        heartRate: "68 bpm",
        steps: "12,456",
        fallsDetected: 1,
        lastAlert: "2 hours ago",
      },
      eventCallbacks: [
        { event: "Fall Detected", action: "Alert Medical Staff", enabled: true },
        { event: "Low Battery", action: "Remind User", enabled: true },
      ],
    },
    {
      id: "u3",
      name: "Emma Davis",
      role: "Staff",
      room: "Multiple",
      status: "active",
      assignedDevices: 3,
      wearables: [
        { type: "SmartWatch", name: "Samsung Galaxy Watch 6" },
      ],
      mobileDevices: [
        { type: "iPhone", name: "iPhone 14" },
      ],
      metrics: {
        heartRate: "75 bpm",
        steps: "15,678",
        fallsDetected: 0,
        lastAlert: "None",
      },
      eventCallbacks: [
        { event: "Patient Alert", action: "Push Notification", enabled: true },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage users, device assignments, and health metrics
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="grid gap-6">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback>
                      {user.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{user.name}</CardTitle>
                    <CardDescription>
                      {user.role} • {user.room}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Assigned Devices */}
              <div>
                <h3 className="font-semibold mb-3">Assigned Devices ({user.assignedDevices})</h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Watch className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Wearables</p>
                      {user.wearables.map((device, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">
                          {device.name}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Mobile Devices</p>
                      {user.mobileDevices.map((device, idx) => (
                        <p key={idx} className="text-xs text-muted-foreground">
                          {device.name}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Health Metrics */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Health Metrics
                </h3>
                <div className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Heart Rate</p>
                    <p className="text-lg font-semibold">{user.metrics.heartRate}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Steps Today</p>
                    <p className="text-lg font-semibold">{user.metrics.steps}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Falls Detected</p>
                    <p className="text-lg font-semibold">{user.metrics.fallsDetected}</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="text-xs text-muted-foreground">Last Alert</p>
                    <p className="text-lg font-semibold">{user.metrics.lastAlert}</p>
                  </div>
                </div>
              </div>

              {/* Event Callbacks */}
              <div>
                <h3 className="font-semibold mb-3">Event Callbacks</h3>
                <div className="space-y-2">
                  {user.eventCallbacks.map((callback, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{callback.event}</p>
                        <p className="text-xs text-muted-foreground">
                          Action: {callback.action}
                        </p>
                      </div>
                      <Badge variant={callback.enabled ? "default" : "secondary"}>
                        {callback.enabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
