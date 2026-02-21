import HeroBanner from '@/components/home/HeroBanner';
import ShopByOccasion from '@/components/home/ShopByOccasion';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import CollectionBanners from '@/components/home/CollectionBanners';
import StorytellingSection from '@/components/home/StorytellingSection';
import NewsletterSignup from '@/components/home/NewsletterSignup';
import TrustBadges from '@/components/shared/TrustBadges';

const Index = () => (
  <>
    <HeroBanner />
    <TrustBadges />
    <ShopByOccasion />
    <FeaturedCollections />
    <CollectionBanners />
    <StorytellingSection />
    <NewsletterSignup />
  </>
);

export default Index;
