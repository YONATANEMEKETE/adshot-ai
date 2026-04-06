import type { Metadata } from 'next';

import MarketingNavbar from '@/components/shared/MarketingNavbar';

export const metadata: Metadata = {
  title: {
    default: 'AdShot AI | Virtual Studio for Product Photos',
    template: '%s | AdShot AI',
  },
  description:
    'Transform flat product photos into polished lifestyle marketing assets with AdShot AI.',
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MarketingNavbar
        brandName="AdShot AI"
        homeHref="/"
        items={[
          { href: '/#features', label: 'Features' },
          { href: '/#how-it-works', label: 'How It Works' },
          { href: '/#pricing', label: 'Pricing' },
          { href: '/#resources', label: 'Resources' },
        ]}
        signInHref="/sign-in"
        signInLabel="Sign In"
        signUpHref="/sign-up"
        signUpLabel="Get Started"
      />
      <main>{children}</main>
    </>
  );
}
//
