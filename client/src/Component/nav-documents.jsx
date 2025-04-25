import {
  FolderIcon,
  MoreHorizontalIcon,
  ShareIcon,
  DatabaseIcon,
  ClipboardListIcon,
  FileIcon
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

// Ye raha data array
const items = [
  { name: "Data Library", url: "#", icon: DatabaseIcon },
  { name: "Reports", url: "#", icon: ClipboardListIcon },
  { name: "Word Assistant", url: "#", icon: FileIcon }
]

export function NavDocuments() {
  const { isMobile } = useSidebar();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="text-[16px] font-semibold">Documents</SidebarGroupLabel>
      <SidebarMenu>

        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              <a href={item.url} className="flex items-center gap-2 text-[15px]">
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction
                  showOnHover
                  className="rounded-sm data-[state=open]:bg-accent"
                >
                  <MoreHorizontalIcon className="h-5 w-5" />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-28 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem className="flex items-center gap-2 text-[14px]">
                  <FolderIcon className="h-4 w-4" />
                  <span>Open</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-[14px]">
                  <ShareIcon className="h-4 w-4" />
                  <span>Share</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="flex items-center gap-2 text-[15px] text-sidebar-foreground/70">
            <MoreHorizontalIcon className="h-5 w-5 text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

      </SidebarMenu>
    </SidebarGroup>
  )
}
