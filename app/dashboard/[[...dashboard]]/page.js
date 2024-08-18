'use client'
import Header from '@/app/components/Header';
import DashboardLayout from '../../components/Dashboardlayout';
import Footer from '@/app/components/Footer';
import { Sidebar, SidebarBody, SidebarLink } from '@/app/components/ui/sidebar';

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHome
} from "@tabler/icons-react";

// Example usage:
const links = [
  { label: "Home", href: "/", icon: <IconHome /> },
  { label: "Settings", href: "/about", icon: <IconSettings /> },
  { label: "Logout", href: "/logout", icon: <IconUserBolt /> }
];

export default function Page() {
  return (
    <div class="h-screen bg-white flex flex-col">
      <Header/>

      <DashboardLayout>
        <div className="flex flex-row h-full w-full">
          <div className="rounded-tl-2xl bg-gray-200 h-full">
            <Sidebar>
              <SidebarBody className="">
                {links.map((link) => (
                  <SidebarLink key={link.href} link={link} />
                ))}
              </SidebarBody>
            </Sidebar>
          </div>
          <div className="flex-grow p-4">
            <h1>Welcome to your dashboard!</h1>
            <p>Some content</p>

          </div>
        </div>

      </DashboardLayout>

      <Footer />
    </div>
  );
}