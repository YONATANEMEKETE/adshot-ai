import type { Metadata } from 'next';

import GalleryMasonrySection from '@/components/marketing/GalleryMasonrySection';

export const metadata: Metadata = {
  title: 'Gallery',
  description:
    'Browse the AdShot AI marketing gallery of polished scenes, textures, and lifestyle-inspired compositions.',
};

export default function GalleryPage() {
  return <GalleryMasonrySection />;
}
