import {
  BookIcon,
  Calendar,
  Home,
  Presentation,
  Star,
  User,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface navItem {
  title: string;
  url: string;
  icon: React.ElementType;
}

const commonItems = [{ title: "Home", url: "/", icon: Home }];
const adminItems = [
  { title: "Users", url: "/dashboard/users", icon: User },
  { title: "All bookings", url: "/dashboard/all-bookings", icon: BookIcon },
];
const tutorItems = [
  { title: "Tutor profile", url: "/dashboard/profile", icon: User2 },
  {
    title: "Set availability",
    url: "/dashboard/set-availability",
    icon: Calendar,
  },
  {
    title: "Review and Ratings",
    url: "/dashboard/review-rating",
    icon: Star,
  },
  {
    title: "Sessions",
    url: "/dashboard/sessions",
    icon: Presentation,
  },
];
const studentItems = [
  { title: "My bookings", url: "/my-bookings", icon: BookIcon },
];

export function AppSidebar({ role }: { role: string }) {
  let roleItems: navItem[] = [];
  if (role === "ADMIN") roleItems = adminItems;
  if (role === "STUDENT") roleItems = studentItems;
  if (role === "TUTOR") roleItems = tutorItems;
  const items = [...commonItems, ...roleItems];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
