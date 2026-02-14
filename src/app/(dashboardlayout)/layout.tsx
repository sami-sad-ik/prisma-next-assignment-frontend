import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { userService } from "../modules/user.service";
import { AppSidebar } from "@/components/shared/sidebar";

const CommonLayout = async ({
  admin,
  student,
  tutor,
}: {
  admin: React.ReactNode;
  student: React.ReactNode;
  tutor: React.ReactNode;
}) => {
  const { user } = await userService.getSession();

  return (
    <div>
      <SidebarProvider>
        <AppSidebar role={user.role} />
        <main className="w-full">
          {/* The SidebarTrigger allows users to collapse/expand the bar */}
          <SidebarTrigger className="m-4" />
          <div className="p-4">
            {user.role === "ADMIN" && admin}
            {user.role === "STUDENT" && student}
            {user.role === "TUTOR" && tutor}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default CommonLayout;
