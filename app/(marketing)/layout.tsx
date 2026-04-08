import type { Metadata } from 'next';

import MarketingNavbar from '@/components/shared/MarketingNavbar';
import FooterCTA from '@/components/marketing/FooterCTA';

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
          { href: '/#how-it-works', label: 'How It Works' },
          { href: '/#pricing', label: 'Pricing' },
          { href: '/gallery', label: 'Gallery' },
        ]}
        signInHref="/auth"
        signInLabel="Sign In"
        signUpHref="/auth"
        signUpLabel="Get Started"
      />
      <main>{children}</main>
      <FooterCTA />
    </>
  );
}
//
