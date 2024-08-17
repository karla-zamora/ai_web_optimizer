'use client';
import { useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [isSignedIn, isLoaded, router]);

  // Render children only if the user is signed in
  if (!isLoaded || !isSignedIn) {
    return null; // Or a loading spinner
  }

  return <>{children}</>;
};

export default DashboardLayout;
