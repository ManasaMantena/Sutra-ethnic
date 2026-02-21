import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import { products } from '@/data/products';

const FeaturedCollections = () => {
  const trending = products.filter(p => p.isBestseller || p.isNew).slice(0, 8);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let animationFrameId: number;
    let scrollPos = 0;

    const autoScroll = () => {
      if (container) {
        scrollPos += 0.3;
        if (scrollPos > container.scrollWidth - container.clientWidth) {
          scrollPos = 0;
        }
        container.scrollLeft = scrollPos;
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isAutoScrolling]);

  return (
    <section className="bg-cream-dark">
      <div className="container-luxury py-20 lg:py-28">
        <div className="text-center mb-16">
          <span className="subheading">Curated for You</span>
          <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">Trending in USA</h2>
          <div className="divider-gold mt-6" />
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsAutoScrolling(false)}
          onMouseLeave={() => setIsAutoScrolling(true)}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {trending.map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.slug}`}
              className="group flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 h-24 whitespace-nowrap"
            >
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="h-14 w-14 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-xs text-gray-400">No image</span>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-charcoal group-hover:text-gray-600 transition-colors line-clamp-2">
                  {product.name}
                </span>
                <span className="text-xs text-gold font-semibold">
                  ${product.price}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/category/nri-favorites" className="btn-brand-outline text-xs">
            View All Trending
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
