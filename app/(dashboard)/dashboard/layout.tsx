import type { Metadata } from 'next';

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
  return <main>{children}</main>;
}
