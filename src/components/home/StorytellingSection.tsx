import artisanImg from '@/assets/artisan-story.jpg';
import { Link } from 'react-router-dom';

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
      <div className="flex items-center py-16 lg:py-24 px-8 lg:px-16 xl:px-24">
        <div className="max-w-lg">
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
          <div className="flex items-center gap-6">
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
