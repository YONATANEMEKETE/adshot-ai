import { ImageComparison } from '@/components/ui/image-comparison-slider';

const afterImage = '/images/product-before.jpeg';
const beforeImage = '/images/product-after.jpeg';

export default function HeroComparisonCard() {
  return (
    <ImageComparison
      beforeImage={beforeImage}
      afterImage={afterImage}
      altBefore="Flat product photo before editing"
      altAfter="AI-generated lifestyle ad image after editing"
      className="aspect-[4/5] h-full border border-border lg:aspect-auto"
    />
  );
}
