import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Smartphone, Users, Wifi } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stats = [
    {
      title: "Active Devices",
      value: "47",
      description: "+12% from last month",
      icon: Wifi,
    },
    {
      title: "Connected Users",
      value: "23",
      description: "8 active right now",
      icon: Users,
    },
    {
      title: "Health Monitors",
      value: "15",
      description: "All systems normal",
      icon: Activity,
    },
    {
      title: "Mobile Devices",
      value: "31",
      description: "23 smartwatches, 8 phones",
      icon: Smartphone,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor and manage your smart room ecosystem
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Real-time updates from your smart devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Fall detection alert cleared
                  </p>
                  <p className="text-sm text-muted-foreground">
                    User: Sarah Johnson - SmartWatch Pro
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">2m ago</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Temperature adjusted
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Room 204 - Smart Thermostat
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">15m ago</div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Heart rate spike detected
                  </p>
                  <p className="text-sm text-muted-foreground">
                    User: Mike Chen - Auto-alert sent
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">1h ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>AI Assistant Stats</CardTitle>
            <CardDescription>
              Voice commands and interactions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Commands Today</span>
                <span className="text-2xl font-bold">142</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Success Rate</span>
                <span className="text-2xl font-bold">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Avg Response</span>
                <span className="text-2xl font-bold">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
