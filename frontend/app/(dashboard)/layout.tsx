"use client";

import * as React from "react";
import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import {
  Home,
  Smartphone,
  Users,
  BarChart3,
  Settings,
  Activity,
  Wifi,
  MessageSquare,
} from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { TopBar } from "@/components/top-bar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
