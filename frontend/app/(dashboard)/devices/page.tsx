import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Wifi, Bluetooth, Activity, Plus } from "lucide-react";

export default async function DevicesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Mock data - replace with real data from your backend
  const devices = [
    {
      id: "1",
      name: "Smart Thermostat",
      type: "Climate Control",
      room: "Room 204",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: null,
      lastSeen: "2 minutes ago",
    },
    {
      id: "2",
      name: "Motion Sensor A1",
      type: "Security",
      room: "Hallway",
      status: "online",
      wifi: true,
      bluetooth: false,
      battery: "85%",
      lastSeen: "1 minute ago",
    },
    {
      id: "3",
      name: "Smart Lock",
      type: "Access Control",
      room: "Main Entrance",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: null,
      lastSeen: "5 minutes ago",
    },
    {
      id: "4",
      name: "Air Quality Monitor",
      type: "Environmental",
      room: "Room 305",
      status: "offline",
      wifi: true,
      bluetooth: false,
      battery: "12%",
      lastSeen: "2 hours ago",
    },
  ];

  const wearables = [
    {
      id: "w1",
      name: "SmartWatch Pro",
      user: "Sarah Johnson",
      model: "Apple Watch Series 9",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: "67%",
      heartRate: "72 bpm",
      fallDetection: true,
      lastSync: "1 minute ago",
    },
    {
      id: "w2",
      name: "Health Band",
      user: "Mike Chen",
      model: "Fitbit Charge 6",
      status: "online",
      wifi: false,
      bluetooth: true,
      battery: "45%",
      heartRate: "68 bpm",
      fallDetection: false,
      lastSync: "3 minutes ago",
    },
    {
      id: "w3",
      name: "SmartWatch Elite",
      user: "Emma Davis",
      model: "Samsung Galaxy Watch 6",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: "89%",
      heartRate: "75 bpm",
      fallDetection: true,
      lastSync: "30 seconds ago",
    },
  ];

  const mobileDevices = [
    {
      id: "m1",
      name: "iPhone 15 Pro",
      user: "Sarah Johnson",
      model: "iOS 18.1",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: "82%",
      assistantActive: true,
      lastActive: "Just now",
    },
    {
      id: "m2",
      name: "Samsung Galaxy S24",
      user: "Mike Chen",
      model: "Android 14",
      status: "online",
      wifi: true,
      bluetooth: true,
      battery: "58%",
      assistantActive: true,
      lastActive: "2 minutes ago",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Devices</h1>
          <p className="text-muted-foreground">
            Manage IoT devices, wearables, and mobile devices
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Device
        </Button>
      </div>

      <Tabs defaultValue="iot" className="space-y-4">
        <TabsList>
          <TabsTrigger value="iot">IoT Devices</TabsTrigger>
          <TabsTrigger value="wearables">Wearables</TabsTrigger>
          <TabsTrigger value="mobile">Mobile Devices</TabsTrigger>
        </TabsList>

        <TabsContent value="iot" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>IoT Devices</CardTitle>
              <CardDescription>
                Smart devices with WiFi and Bluetooth connectivity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Connectivity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Last Seen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {devices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.type}</TableCell>
                      <TableCell>{device.room}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {device.wifi && (
                            <Wifi className="h-4 w-4 text-blue-500" />
                          )}
                          {device.bluetooth && (
                            <Bluetooth className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            device.status === "online" ? "default" : "secondary"
                          }
                        >
                          {device.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.battery || "AC Power"}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.lastSeen}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wearables" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wearable Devices</CardTitle>
              <CardDescription>
                SmartWatches and health monitors with fall detection and heart rate sensors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Model</TableHead>
                    <TableHead>Connectivity</TableHead>
                    <TableHead>Heart Rate</TableHead>
                    <TableHead>Fall Detection</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Last Sync</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {wearables.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.user}</TableCell>
                      <TableCell>{device.model}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {device.wifi && (
                            <Wifi className="h-4 w-4 text-blue-500" />
                          )}
                          {device.bluetooth && (
                            <Bluetooth className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Activity className="h-4 w-4 text-red-500" />
                          {device.heartRate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={device.fallDetection ? "default" : "secondary"}>
                          {device.fallDetection ? "Enabled" : "Disabled"}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.battery}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.lastSync}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mobile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Mobile Devices</CardTitle>
              <CardDescription>
                Phones and tablets with SmartestZone AI Assistant
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>OS Version</TableHead>
                    <TableHead>Connectivity</TableHead>
                    <TableHead>AI Assistant</TableHead>
                    <TableHead>Battery</TableHead>
                    <TableHead>Last Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mobileDevices.map((device) => (
                    <TableRow key={device.id}>
                      <TableCell className="font-medium">{device.name}</TableCell>
                      <TableCell>{device.user}</TableCell>
                      <TableCell>{device.model}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {device.wifi && (
                            <Wifi className="h-4 w-4 text-blue-500" />
                          )}
                          {device.bluetooth && (
                            <Bluetooth className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={device.assistantActive ? "default" : "secondary"}>
                          {device.assistantActive ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell>{device.battery}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {device.lastActive}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
