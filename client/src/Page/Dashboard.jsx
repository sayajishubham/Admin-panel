import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../Component/app-sidebar.jsx";
import { SiteHeader } from "../Component/site-header.jsx";
import { SectionCards } from "../Component/section-cards.jsx";
import { ChartAreaInteractive } from "../Component/chart-area-interactive.jsx";
import Datatable from '../Component/data-table.jsx'

function Dashboard() {
  return (
    <div>
        <div className="w-full ">
        <SidebarProvider className="dark">
          <AppSidebar />

          <div className="flex flex-col w-[100%]">
            <SiteHeader />
            <SectionCards />
            <Datatable />
            <ChartAreaInteractive />

          </div>

        </SidebarProvider>
      </div>
      
    </div>
  )
}

export default Dashboard
