import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { occasions } from '@/data/products';

const occasionImages: Record<string, string> = {
  wedding: 'https://i.pinimg.com/1200x/e1/94/3e/e1943e20b449965602b0dfd42c2156fe.jpg',
  festive: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&q=80',
  sangeet: 'https://i.pinimg.com/736x/58/5f/a0/585fa0267acb6c5b80e168ad7f5687e1.jpg',
  mehendi: 'https://i.pinimg.com/1200x/d8/5d/dc/d85ddce2398316c3cf0221d7adeda603.jpg',
  reception: 'https://i.pinimg.com/736x/b1/15/95/b11595be96700d598e84f42b6342d2e5.jpg',
  casual: 'https://i.pinimg.com/736x/9d/77/65/9d7765ff810d0566239050c530a6afe8.jpg',
  pooja: 'https://i.pinimg.com/736x/0c/b6/3f/0cb63fce95e4a7a9e1aa73b785235f23.jpg',
  cocktail: 'https://i.pinimg.com/736x/fc/84/9e/fc849ebad66a231b9fce84209e1542a4.jpg',
};

const ShopByOccasion = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
  const container = scrollContainerRef.current;
  if (!container) return;

  let animationFrameId: number;

  const autoScroll = () => {
    container.scrollLeft += 0.5;

    // When scrolled half (original width),
    // reset to beginning smoothly
    if (container.scrollLeft >= container.scrollWidth / 2) {
      container.scrollLeft = 0;
    }

    animationFrameId = requestAnimationFrame(autoScroll);
  };

  animationFrameId = requestAnimationFrame(autoScroll);

  return () => cancelAnimationFrame(animationFrameId);
}, []);
  // useEffect(() => {
  //   if (!isAutoScrolling || !scrollContainerRef.current) return;

  //   const container = scrollContainerRef.current;
  //   let animationFrameId: number;
  //   let scrollPos = 0;

  //   const autoScroll = () => {
  //     if (container) {
  //       scrollPos += 0.5;
  //       const maxScroll = container.scrollWidth - container.clientWidth;
  //       if (scrollPos > maxScroll) {
  //         scrollPos = 0;
  //       }
  //       container.scrollLeft = scrollPos;
  //     }
  //     animationFrameId = requestAnimationFrame(autoScroll);
  //   };

  //   animationFrameId = requestAnimationFrame(autoScroll);

  //   return () => cancelAnimationFrame(animationFrameId);
  // }, [isAutoScrolling]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      if (direction === 'left') {
        scrollContainerRef.current.scrollLeft -= scrollAmount;
      } else {
        scrollContainerRef.current.scrollLeft += scrollAmount;
      }
      setIsAutoScrolling(false);
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
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          className="flex gap-6 overflow-x-auto no-scrollbar"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* {occasions.map((occ) => ( */}
          {[...occasions, ...occasions].map((occ, index) => (
            <Link
              key={occ.slug}
              to={`/category/occasion/${occ.slug}`}
              className="group flex-shrink-0 flex flex-col items-center gap-3"
            >
              <div className="relative overflow-hidden rounded-full shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105 w-40 h-40">
                <img
                  src={occasionImages[occ.slug] || 'https://images.unsplash.com/photo-1599599810694-433d682f0d6d?w=400&q=80'}
                  alt={occ.name}
                  className="w-full h-full object-cover"
                />
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
