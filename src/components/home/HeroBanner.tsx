import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroBanner from '@/assets/hero-banner.jpg';

const HeroBanner = () => (
  <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
    <img
      src={heroBanner}
      alt="Luxurious Indian silk with gold zari embroidery"
      className="absolute inset-0 w-full h-full object-cover"
      loading="eager"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />

    <div className="relative container-luxury h-full flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-xl"
      >
        <span className="inline-block text-[10px] font-medium tracking-[0.35em] uppercase text-gold-light mb-4">
          Heritage Reimagined
        </span>
        <h1 className="font-serif text-5xl lg:text-6xl xl:text-7xl font-semibold leading-[1.1] text-cream mb-6">
          Where Craft
          <br />
          Meets Soul
        </h1>
        <p className="text-base lg:text-lg text-cream/80 leading-relaxed mb-8 max-w-md font-light">
          India's finest handcrafted ethnic wear, curated for the modern diaspora.
          Each piece tells a story of generations.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/category/women" className="btn-brand-gold">
            Shop Women
          </Link>
          <Link to="/category/men" className="btn-brand-outline border-cream/40 text-cream hover:bg-cream/10 hover:text-cream">
            Shop Men
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HeroBanner;
