"use client";

import * as React from "react";
import { OrganizationSwitcher } from "@clerk/nextjs";
import {
  Home,
  Smartphone,
  Users,
  BarChart3,
  Settings,
  Activity,
  Wifi,
  MessageSquare,
  Building2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", icon: Home, href: "/" },
      { title: "Analytics", icon: BarChart3, href: "/analytics" },
    ],
  },
  {
    title: "Devices",
    items: [
      { title: "IoT Devices", icon: Wifi, href: "/devices" },
      { title: "Wearables", icon: Activity, href: "/devices/wearables" },
      { title: "Mobile Devices", icon: Smartphone, href: "/devices/mobile" },
    ],
  },
  {
    title: "Management",
    items: [
      { title: "Users", icon: Users, href: "/users" },
      { title: "AI Assistant", icon: MessageSquare, href: "/ai-assistant" },
      { title: "Settings", icon: Settings, href: "/settings" },
    ],
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Building2 className="h-6 w-6" />
          <span className="font-semibold text-lg">SmartestZone</span>
        </div>
        <div className="mt-4">
          <OrganizationSwitcher
            hidePersonal
            appearance={{
              elements: {
                rootBox: "w-full",
                organizationSwitcherTrigger: "w-full justify-start px-2 py-2 rounded-md hover:bg-accent",
              },
            }}
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="text-xs text-muted-foreground">
          © 2025 SmartestZone
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
