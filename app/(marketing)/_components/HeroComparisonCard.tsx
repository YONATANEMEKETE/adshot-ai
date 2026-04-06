import { ImageComparison } from '@/components/ui/image-comparison-slider';

const beforeImage =
  'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80';
const afterImage =
  'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1200&q=80';

export default function HeroComparisonCard() {
  return (
    <ImageComparison
      beforeImage={beforeImage}
      afterImage={afterImage}
      altBefore="Flat product photo before editing"
      altAfter="AI-generated lifestyle ad image after editing"
      className="aspect-[4/5] h-full border border-border"
    />
  );
}
