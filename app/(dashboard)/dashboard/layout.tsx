import type { Metadata } from 'next';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

export const metadata: Metadata = {
  title: {
    default: 'Dashboard',
    template: '%s | AdShot AI',
  },
  description: 'Manage your AdShot AI studio workspace and generated shots.',
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-[100dvh] overflow-hidden bg-background">
      <div className="mx-auto flex h-full max-w-[1600px] flex-col gap-4 md:flex-row md:gap-6">
        <DashboardSidebar />
        <div className="min-w-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
    </main>
  );
}
