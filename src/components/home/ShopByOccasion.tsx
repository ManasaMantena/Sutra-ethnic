import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { occasions } from '@/data/products';

const icons: Record<string, string> = {
  wedding: '💍',
  festive: '🪔',
  sangeet: '💃',
  mehendi: '🌿',
  reception: '✨',
  casual: '🌸',
  pooja: '🕉️',
  cocktail: '🥂',
};

const ShopByOccasion = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      if (direction === 'left') {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
    }
  };

  return (
    <section className="container-luxury py-20 lg:py-28">
      <div className="text-center mb-16">
        <span className="subheading">Dress for Every Moment</span>
        <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">Shop by Occasion</h2>
        <div className="divider-gold mt-6" />
      </div>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6"
          style={{ scrollBehavior: 'smooth' }}
        >
          {occasions.map((occ) => (
            <Link
              key={occ.slug}
              to={`/category/occasion/${occ.slug}`}
              className="group flex-shrink-0 flex flex-col items-center gap-3 w-32"
            >
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white border border-gray-200 shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110 flex items-center justify-center">
                  <span className="text-5xl">{icons[occ.slug] || '✦'}</span>
                </div>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-sm text-charcoal group-hover:text-gray-600 transition-colors">{occ.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{occ.count}+ styles</p>
              </div>
            </Link>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="hidden lg:flex absolute left-0 top-1/3 -translate-y-1/2 -translate-x-6 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-charcoal hover:bg-gray-50 transition-colors z-10"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="hidden lg:flex absolute right-0 top-1/3 -translate-y-1/2 translate-x-6 items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-charcoal hover:bg-gray-50 transition-colors z-10"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default ShopByOccasion;
