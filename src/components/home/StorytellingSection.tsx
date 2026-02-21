import artisanImg from '@/assets/artisan-story.jpg';
import { Link } from 'react-router-dom';

const categories = [
  { label: 'Women', href: '/category/women' },
  { label: 'Men', href: '/category/men' },
  { label: 'Jewelry', href: '/category/jewelry' },
  { label: 'Home', href: '/category/home' },
  { label: 'Wedding', href: '/category/wedding' },
  { label: 'Festive', href: '/category/festive' },
  { label: 'Gifting', href: '/category/gifting' },
  { label: 'Under $150', href: '/category/under-150' },
];

const StorytellingSection = () => (
  <section className="bg-charcoal overflow-hidden">
    <div className="grid grid-cols-1 lg:grid-cols-2">
      {/* Image */}
      <div className="relative aspect-square lg:aspect-auto">
        <img
          src={artisanImg}
          alt="Indian artisan hands weaving golden thread on a traditional loom"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex items-center py-16 lg:py-20 px-8 lg:px-12 xl:px-16">
        <div className="max-w-2xl">
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold">From India to Your Home</span>
          <h2 className="font-serif text-3xl lg:text-4xl text-cream mt-4 mb-6 leading-tight">
            Every Thread Carries a Story of Generations
          </h2>
          <p className="text-sm leading-relaxed text-cream/60 mb-4">
            Behind every Sutra piece is an artisan family that has perfected their craft
            over centuries. From the Banarasi weavers of Varanasi to the Chikankari
            embroiderers of Lucknow, we partner directly with over 200 artisan families.
          </p>
          <p className="text-sm leading-relaxed text-cream/60 mb-8">
            When you wear Sutra, you don't just wear a garment — you carry forward a
            legacy. You bridge the distance between where you are and where your roots
            lie. You become part of the story.
          </p>

          <div className="mb-8">
            <p className="text-xs text-cream/40 uppercase tracking-[0.1em] mb-4 font-medium">Explore Collections</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((cat) => (
                <Link
                  key={cat.label}
                  to={cat.href}
                  className="px-4 py-2 border border-cream/30 text-cream/80 text-xs uppercase tracking-[0.1em] font-medium hover:bg-cream/10 hover:border-cream/60 transition-all duration-300 text-center"
                >
                  {cat.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <Link to="/story" className="btn-brand-gold text-xs">Our Story</Link>
            <div className="flex items-center gap-4 text-cream/40 text-xs">
              <div className="text-center">
                <div className="font-serif text-2xl text-cream">200+</div>
                <div>Artisan Families</div>
              </div>
              <div className="w-px h-10 bg-cream/20" />
              <div className="text-center">
                <div className="font-serif text-2xl text-cream">15</div>
                <div>Indian States</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default StorytellingSection;
