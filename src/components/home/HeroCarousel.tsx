import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  id: number;
  type: 'video' | 'image';
  src: string;
  tag: string;
  title: string;
  description: string;
  cta: {
    text: string;
    href: string;
  };
}

const slides: Slide[] = [
  {
    id: 1,
    type: 'video',
    src: 'https://cdn.coverr.co/videos/coverr-weaving-on-a-loom-9714/1080p.mp4',
    tag: 'Heritage Reimagined',
    title: 'Where Craft Meets Soul',
    description: "India's finest handcrafted ethnic wear, curated for the modern diaspora.",
    cta: { text: 'Shop Now', href: '/category/women' }
  },
  {
    id: 2,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c',
    tag: 'Timeless Collection',
    title: 'Ethnic Wear Collection',
    description: 'Discover exquisite sarees and lehengas for every occasion.',
    cta: { text: 'Shop Women', href: '/category/women' }
  },
  {
    id: 3,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622445275576-721325763afe',
    tag: 'Artisan Crafted',
    title: 'Threading & Artisan Craft',
    description: 'Experience the mastery of traditional Indian craftsmanship.',
    cta: { text: 'Shop Now', href: '/category/women' }
  },
  {
    id: 4,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a',
    tag: 'Premium Selection',
    title: 'Gifting Collection',
    description: 'Perfect gifts for your loved ones, wrapped in tradition.',
    cta: { text: 'Shop Now', href: '/category/gifting' }
  },
  {
    id: 5,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1622445275576-721325763afe',
    tag: 'Bold & Refined',
    title: 'Men Ethnic Wear',
    description: 'Sherwanis, kurtas, and indo-western styles that command presence.',
    cta: { text: 'Shop Men', href: '/category/men' }
  },
  {
    id: 6,
    type: 'image',
    src: 'https://images.unsplash.com/photo-1593032465171-8e7f4d92a76d',
    tag: 'Bridal Elegance',
    title: 'Wedding Collection',
    description: 'Celebrate your special day with authentic heritage pieces.',
    cta: { text: 'Shop Wedding', href: '/category/wedding' }
  }
];

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setAutoplay(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoplay(false);
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen lg:h-[90vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          {slide.type === 'video' ? (
            <video
              src={slide.src}
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
            />
          ) : (
            <img
              src={slide.src}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 via-charcoal/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative container-luxury h-full flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl z-10"
          >
            <span className="inline-block text-[10px] font-medium tracking-[0.35em] uppercase text-gold-light mb-4">
              {slide.tag}
            </span>
            <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-cream mb-6">
              {slide.title}
            </h1>
            <p className="text-base lg:text-lg text-cream/80 leading-relaxed mb-8 max-w-md font-light">
              {slide.description}
            </p>
            <div className="flex items-center gap-4">
              <Link to={slide.cta.href} className="btn-brand-gold">
                {slide.cta.text}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-20 p-3 text-cream hover:text-gold transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-20 p-3 text-cream hover:text-gold transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-8 bg-cream'
                : 'w-2 bg-cream/40 hover:bg-cream/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;
