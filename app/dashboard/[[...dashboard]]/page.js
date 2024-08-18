'use client'
import Header from '@/app/components/Header';
import DashboardLayout from '../../components/Dashboardlayout';
import Footer from '@/app/components/Footer';

export default function Page() {
  return (
    <div class="h-screen bg-white flex flex-col">
      <Header/>

      <DashboardLayout>
        <h1>Welcome to your dashboard!</h1>
      </DashboardLayout>

      <Footer />
    </div>
  );
}