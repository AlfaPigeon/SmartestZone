import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Activity, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Heart } from "lucide-react";

export default async function AnalyticsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Mock analytics data
  const deviceMetrics = [
    {
      name: "Device Uptime",
      value: "99.8%",
      change: "+0.3%",
      trend: "up",
      status: "excellent",
    },
    {
      name: "Average Response Time",
      value: "1.2s",
      change: "-0.4s",
      trend: "up",
      status: "good",
    },
    {
      name: "Failed Connections",
      value: "0.2%",
      change: "-0.1%",
      trend: "up",
      status: "excellent",
    },
    {
      name: "Battery Alerts",
      value: "3",
      change: "+1",
      trend: "down",
      status: "warning",
    },
  ];

  const healthMetrics = [
    {
      metric: "Average Heart Rate",
      value: "72 bpm",
      range: "60-80 bpm",
      status: "normal",
      users: 23,
    },
    {
      metric: "Fall Detection Events",
      value: "2",
      range: "Last 30 days",
      status: "monitored",
      users: 2,
    },
    {
      metric: "High Heart Rate Alerts",
      value: "5",
      range: "Last 7 days",
      status: "attention",
      users: 3,
    },
    {
      metric: "Activity Level",
      value: "8,500",
      range: "Avg steps/day",
      status: "good",
      users: 23,
    },
  ];

  const eventCallbacks = [
    {
      id: "e1",
      event: "Fall Detected",
      user: "Mike Chen",
      device: "Fitbit Charge 6",
      callback: "Alert Medical Staff",
      status: "executed",
      timestamp: "2 hours ago",
      responseTime: "15s",
    },
    {
      id: "e2",
      event: "Heart Rate Spike",
      user: "Sarah Johnson",
      device: "Apple Watch Series 9",
      callback: "Send Notification",
      status: "executed",
      timestamp: "5 hours ago",
      responseTime: "2s",
    },
    {
      id: "e3",
      event: "Low Battery Warning",
      user: "Emma Davis",
      device: "Motion Sensor A1",
      callback: "Email Administrator",
      status: "executed",
      timestamp: "1 day ago",
      responseTime: "30s",
    },
    {
      id: "e4",
      event: "Temperature Threshold",
      user: "System",
      device: "Smart Thermostat",
      callback: "Adjust Temperature",
      status: "executed",
      timestamp: "1 day ago",
      responseTime: "5s",
    },
  ];

  const aiAssistantMetrics = [
    {
      metric: "Total Commands",
      value: "1,456",
      change: "+12%",
      period: "This month",
    },
    {
      metric: "Success Rate",
      value: "98.5%",
      change: "+1.2%",
      period: "This month",
    },
    {
      metric: "Avg Response Time",
      value: "1.2s",
      change: "-0.3s",
      period: "This week",
    },
    {
      metric: "Active Users",
      value: "23",
      change: "+3",
      period: "Right now",
    },
  ];

  const deviceUsage = [
    { device: "Smart Thermostat", interactions: 342, percentage: 23.5 },
    { device: "Smart Lighting", interactions: 567, percentage: 38.9 },
    { device: "Access Control", interactions: 89, percentage: 6.1 },
    { device: "Camera System", interactions: 234, percentage: 16.1 },
    { device: "Others", interactions: 224, percentage: 15.4 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground">
          Monitor device metrics, health data, and event callbacks
        </p>
      </div>

      <Tabs defaultValue="devices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="devices">Device Metrics</TabsTrigger>
          <TabsTrigger value="health">Health Metrics</TabsTrigger>
          <TabsTrigger value="events">Event Callbacks</TabsTrigger>
          <TabsTrigger value="ai">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {deviceMetrics.map((metric) => (
              <Card key={metric.name}>
                <CardHeader className="pb-2">
                  <CardDescription>{metric.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <div className="flex items-center gap-1 text-xs">
                    {metric.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-500" />
                    )}
                    <span className={metric.trend === "up" ? "text-green-500" : "text-red-500"}>
                      {metric.change}
                    </span>
                    <span className="text-muted-foreground">from last week</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Usage Distribution</CardTitle>
              <CardDescription>
                Interaction count with devices via AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Type</TableHead>
                    <TableHead>Interactions</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deviceUsage.map((item) => (
                    <TableRow key={item.device}>
                      <TableCell className="font-medium">{item.device}</TableCell>
                      <TableCell>{item.interactions}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <span className="text-sm">{item.percentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {healthMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{metric.metric}</CardTitle>
                    {metric.status === "normal" && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                    {metric.status === "attention" && (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                    {metric.status === "good" && (
                      <Activity className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <CardDescription>{metric.range}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <div className="text-3xl font-bold">{metric.value}</div>
                    <div className="text-sm text-muted-foreground">
                      {metric.users} users tracked
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500" />
                Health Monitoring Overview
              </CardTitle>
              <CardDescription>
                Real-time health metrics from wearable devices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Active Wearables</span>
                    <Badge>15 devices</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    All devices reporting normal metrics
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Fall Detection</span>
                    <Badge variant="secondary">Enabled on 12 devices</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    2 events detected in the last 30 days
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Heart Rate Monitoring</span>
                    <Badge>Continuous</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    5 alerts triggered in the last 7 days
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Event Callback History</CardTitle>
              <CardDescription>
                Automatic callbacks triggered by device events and user metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event Type</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Device</TableHead>
                    <TableHead>Callback Action</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventCallbacks.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.event}</TableCell>
                      <TableCell>{event.user}</TableCell>
                      <TableCell>{event.device}</TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {event.callback}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant="default">
                          {event.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{event.responseTime}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {event.timestamp}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Success Rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">100%</div>
                <p className="text-xs text-muted-foreground">All callbacks executed</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Avg Response</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12s</div>
                <p className="text-xs text-muted-foreground">Very responsive</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-4">
            {aiAssistantMetrics.map((metric) => (
              <Card key={metric.metric}>
                <CardHeader className="pb-2">
                  <CardDescription>{metric.metric}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.change} {metric.period}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Performance</CardTitle>
              <CardDescription>
                Command execution and device interaction statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Command Types</span>
                  <Badge>5 categories</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Device control, information queries, automation, alerts, scheduling
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Most Used Platforms</span>
                  <Badge variant="secondary">SmartWatches 62%</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Mobile apps 38% • Voice commands preferred
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Device Tools Available</span>
                  <Badge>47 devices</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  All IoT devices accessible via WiFi and Bluetooth
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
