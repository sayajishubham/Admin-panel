import { MailIcon, PlusCircleIcon, LayoutDashboardIcon, ListIcon, BarChartIcon, FolderIcon, UsersIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
    { title: "Dashboard", icon: LayoutDashboardIcon, url: "#" },
    { title: "Lifecycle", icon: ListIcon, url: "#" },
    { title: "Analytics", icon: BarChartIcon, url: "#" },
    { title: "Project", icon: FolderIcon, url: "#" },
    { title: "Team", icon: UsersIcon, url: "#" },
];

export function NavMain() {
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">

                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center gap-2">
                        <SidebarMenuButton
                            tooltip="Quick Create"
                            className="min-w-8 bg-primary text-primary-foreground text-base duration-200 ease-linear hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground"
                        >
                            <PlusCircleIcon className="h-5 w-5" />
                            <span className="text-base">Quick Create</span>
                        </SidebarMenuButton>

                        <Button
                            size="icon"
                            className="h-9 w-9 shrink-0 group-data-[collapsible=icon]:opacity-0"
                            variant="outline"
                        >
                            <MailIcon className="h-5 w-5" />
                            <span className="sr-only">Inbox</span>
                        </Button>
                    </SidebarMenuItem>
                </SidebarMenu>

                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton tooltip={item.title} className="text-base">
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span className="text-base">{item.title}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>

            </SidebarGroupContent>
        </SidebarGroup>
    );
}

