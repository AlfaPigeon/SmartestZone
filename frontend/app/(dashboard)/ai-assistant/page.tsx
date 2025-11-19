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
import { MessageSquare, Smartphone, Watch, Lightbulb, Thermometer, Lock, Camera, Zap } from "lucide-react";

export default async function AIAssistantPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data - available tools for AI assistant
  const deviceTools = [
    {
      id: "t1",
      name: "Smart Thermostat Control",
      icon: Thermometer,
      description: "Adjust temperature and climate settings",
      deviceType: "Climate Control",
      connectivity: ["WiFi", "Bluetooth"],
      commands: ["Set temperature", "Get current temp", "Set mode"],
      usage: 342,
      status: "active",
    },
    {
      id: "t2",
      name: "Smart Lighting",
      icon: Lightbulb,
      description: "Control lights, brightness, and color",
      deviceType: "Lighting",
      connectivity: ["WiFi", "Bluetooth"],
      commands: ["Turn on/off", "Set brightness", "Change color"],
      usage: 567,
      status: "active",
    },
    {
      id: "t3",
      name: "Access Control",
      icon: Lock,
      description: "Lock/unlock doors and check access status",
      deviceType: "Security",
      connectivity: ["WiFi", "Bluetooth"],
      commands: ["Lock door", "Unlock door", "Get status"],
      usage: 89,
      status: "active",
    },
    {
      id: "t4",
      name: "Camera System",
      icon: Camera,
      description: "View camera feeds and manage recordings",
      deviceType: "Security",
      connectivity: ["WiFi"],
      commands: ["View feed", "Take snapshot", "Check motion"],
      usage: 234,
      status: "active",
    },
  ];

  const assistantStats = {
    totalCommands: 1456,
    successRate: 98.5,
    avgResponseTime: "1.2s",
    activeDevices: 47,
    connectedUsers: 23,
  };

  const recentInteractions = [
    {
      id: "i1",
      user: "Sarah Johnson",
      device: "iPhone 15 Pro",
      command: "Turn on bedroom lights",
      tool: "Smart Lighting",
      status: "success",
      timestamp: "2 minutes ago",
    },
    {
      id: "i2",
      user: "Mike Chen",
      device: "Apple Watch Series 9",
      command: "Set room temperature to 22°C",
      tool: "Smart Thermostat Control",
      status: "success",
      timestamp: "5 minutes ago",
    },
    {
      id: "i3",
      user: "Emma Davis",
      device: "Samsung Galaxy S24",
      command: "Lock main entrance",
      tool: "Access Control",
      status: "success",
      timestamp: "12 minutes ago",
    },
    {
      id: "i4",
      user: "Sarah Johnson",
      device: "Apple Watch Series 9",
      command: "Show camera feed hallway",
      tool: "Camera System",
      status: "success",
      timestamp: "18 minutes ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Assistant</h1>
          <p className="text-muted-foreground">
            Agentic AI assistant for smartwatch and mobile device interactions
          </p>
        </div>
        <Button>
          <Zap className="mr-2 h-4 w-4" />
          Configure Assistant
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Commands</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assistantStats.totalCommands}</div>
            <p className="text-xs text-muted-foreground">+12% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Success Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assistantStats.successRate}%</div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Avg Response</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assistantStats.avgResponseTime}</div>
            <p className="text-xs text-muted-foreground">Very fast</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assistantStats.activeDevices}</div>
            <p className="text-xs text-muted-foreground">As tools</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Connected Users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assistantStats.connectedUsers}</div>
            <p className="text-xs text-muted-foreground">8 active now</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Device Tools */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Available Device Tools
          </CardTitle>
          <CardDescription>
            IoT devices that can be controlled via AI assistant from smartwatches and mobile apps
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {deviceTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-lg border p-4 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <tool.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{tool.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {tool.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="default">{tool.status}</Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {tool.connectivity.map((conn) => (
                    <Badge key={conn} variant="secondary" className="text-xs">
                      {conn}
                    </Badge>
                  ))}
                </div>

                <div>
                  <p className="text-xs text-muted-foreground mb-1">
                    Available Commands:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {tool.commands.map((cmd) => (
                      <span
                        key={cmd}
                        className="text-xs bg-muted px-2 py-1 rounded"
                      >
                        {cmd}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-xs text-muted-foreground">
                    {tool.deviceType}
                  </span>
                  <span className="text-xs font-medium">
                    {tool.usage} uses this month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Interactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Recent Interactions
          </CardTitle>
          <CardDescription>
            Voice and text commands from smartwatches and mobile devices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Command</TableHead>
                <TableHead>Tool Used</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentInteractions.map((interaction) => (
                <TableRow key={interaction.id}>
                  <TableCell className="font-medium">
                    {interaction.user}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {interaction.device.includes("Watch") ? (
                        <Watch className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                      )}
                      {interaction.device}
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-xs bg-muted px-2 py-1 rounded">
                      {interaction.command}
                    </code>
                  </TableCell>
                  <TableCell>{interaction.tool}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        interaction.status === "success" ? "default" : "destructive"
                      }
                    >
                      {interaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {interaction.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
