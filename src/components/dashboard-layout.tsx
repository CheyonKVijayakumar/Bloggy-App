"use client"
import Link from "next/link";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Folders,
  Users,
  ShieldCheck,
  PanelLeft,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const Logo = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 17.6C12 17.6 15.2 14.8 15.2 12.4C15.2 10.432 13.768 8.8 12 8.8C10.232 8.8 8.8 10.432 8.8 12.4C8.8 14.8 12 17.6 12 17.6Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 5.5C10.875 5.5 12.5 7.5 12.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14.5 5.5C13.125 5.5 11.5 7.5 11.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const NavItem = ({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem>
      <Button asChild variant={isActive ? "secondary" : "ghost"} className="justify-start w-full">
        <Link href={href}>
          {icon}
          {children}
        </Link>
      </Button>
    </SidebarMenuItem>
  );
}


export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", icon: <LayoutDashboard className="mr-2 h-4 w-4" />, label: "Dashboard" },
    { href: "/dashboard/projects", icon: <Folders className="mr-2 h-4 w-4" />, label: "Projects" },
    { href: "/dashboard/credits", icon: <ShieldCheck className="mr-2 h-4 w-4" />, label: "My Credits" },
    { href: "/dashboard/stakeholders", icon: <Users className="mr-2 h-4 w-4" />, label: "Stakeholders" },
  ];
  
  const getIsActive = (href: string) => {
    if (href === '/dashboard') return pathname === href;
    return pathname.startsWith(href);
  };


  return (
    <SidebarProvider>
      <div className="h-screen flex flex-col md:flex-row">
        <Sidebar className="hidden border-r bg-card md:block">
            <SidebarHeader className="border-b">
              <Link href="/dashboard" className="flex items-center gap-2 font-semibold font-headline text-lg">
                <Logo />
                <span>Blue Carbon MRV</span>
              </Link>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {navItems.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={getIsActive(item.href)}>
                      <Link href={item.href}>
                        {item.icon}
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden">
              <PanelLeft className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </SidebarTrigger>
            <div className="w-full flex-1">
              {/* Optional: Add search bar here */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/avatar/32/32" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                 <DropdownMenuItem asChild>
                    <Link href="/">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </Link>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
