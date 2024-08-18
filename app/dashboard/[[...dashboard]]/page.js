'use client'
import Header from '@/app/components/Header';
import Sandbox from '@/app/components/Sandbox';
import DashboardLayout from '../../components/Dashboardlayout';
import Footer from '@/app/components/Footer';
import { Sidebar, SidebarBody, SidebarLink } from '@/app/components/ui/sidebar';
import { db, createUser } from '@/firebase';
// import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { useUser } from '@clerk/clerk-react';

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
import { use, useEffect } from 'react';


export default function Page() {
  const { isLoaded, isSignedIn, user } = useUser();

  const createProject = async (user_id, title) => {
    try {
      const projRef = await addDoc(collection(db, collectionName), { title });
      const projDoc = await getDoc(projRef);
      const userRef = doc(db, 'user', user_id)
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const user_data = userDoc.data();
        const project_id_list = user_data.project_id_list || [];
        project_id_list.push(projRef.id);
        await updateDoc(userRef, {
          project_id_list
        })
        if (projDoc.exists()) return NextResponse.json({ title })
      }
      // throw new Error('Something went wrong when creating a new project.');
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  const links = [
    { label: "Create", icon: <IconPlus />, onClick: () => createProject(user.id, 'New Project') },
    { label: "Folder", icon: <IconFolder />, onClick: () => alert('Folder clicked') },
    { label: "Favorites", icon: <IconHeart />, onClick: () => alert('Favorites clicked') },
  ];

  useEffect(() => {
    if(isLoaded && isSignedIn && user.id){
      createUser(user?.id, user?.firstName, user?.lastName, user?.imageUrl);
    }
  }, [isSignedIn, user]);


  return (
    <div className="h-screen bg-white flex flex-col">
      <Header/>

      <DashboardLayout>
        <div className="flex flex-row h-full w-full">
          {/* <div className="rounded-tl-2xl bg-gray-200 h-full">
            <Sidebar>
              <SidebarBody className="">
                {links.map((link, index) => (
                  <SidebarLink key={index} link={link} />
                ))}
              </SidebarBody>
            </Sidebar>
          </div> */}
          <div className="flex-grow p-1 flex-row justify-center content-center text-center">
            <h1 className='text-5xl mt-6'>Welcome to your sandbox!</h1>
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