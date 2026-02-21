import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface TagItem {
  id: string;
  label: string;
  image: string;
  href: string;
}

interface TagScrollSectionProps {
  title: string;
  subtitle: string;
  items: TagItem[];
}

const TagScrollSection = ({ title, subtitle, items }: TagScrollSectionProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    let animationFrameId: number;
    let scrollPos = 0;

    const autoScroll = () => {
      if (container) {
        scrollPos += 0.5;
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

  const handleMouseEnter = () => setIsAutoScrolling(false);
  const handleMouseLeave = () => setIsAutoScrolling(true);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <span className="subheading">{subtitle}</span>
          <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">{title}</h2>
          <div className="divider-gold mt-6" />
        </div>

        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Link
                to={item.href}
                className="group flex-shrink-0 flex items-center gap-4 px-6 py-3 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 h-20 whitespace-nowrap"
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="h-12 w-12 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <span className="text-sm font-medium text-charcoal group-hover:text-gray-600 transition-colors">
                  {item.label}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TagScrollSection;
