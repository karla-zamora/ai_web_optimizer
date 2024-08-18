'use client'
import Header from '@/app/components/Header';
import Sandbox from '@/app/components/Sandbox';
import DashboardLayout from '../../components/Dashboardlayout';
import Footer from '@/app/components/Footer';
import { Sidebar, SidebarBody, SidebarLink } from '@/app/components/ui/sidebar';

import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHome,
  IconFavicon,
  IconFolder,
  IconHeart,
  IconPlus
} from "@tabler/icons-react";


const links = [
  { label: "Create", icon: <IconPlus />, onClick: () => alert('Create clicked') },
  { label: "Folder", icon: <IconFolder />, onClick: () => alert('Folder clicked') },
  { label: "Favorites", icon: <IconHeart />, onClick: () => alert('Favorites clicked') },
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
          <div className="flex-grow p-1">
            <h1>Welcome to your dashboard!</h1>
            <p>Some content</p>
            <div>
              <Sandbox/>
            </div>
          </div>
        </div>

      </DashboardLayout>

      <Footer />
    </div>
  );
}