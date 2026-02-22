import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CollectionBanners = () => (
  <section className="container-luxury py-20 lg:py-28">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Wedding Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <Link to="/category/wedding" className="group relative overflow-hidden aspect-[4/5] block rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1593032465171-8e7f4d92a76d?w=600&q=80"
            alt="Bridal lehenga in maroon and gold"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light">The</span>
            <h3 className="font-serif text-3xl lg:text-4xl text-cream mt-1 mb-3">Wedding Collection</h3>
            <p className="text-sm text-cream/70 mb-4 max-w-sm">For the most important day of your life. Handcrafted bridal and groomswear.</p>
            <span className="btn-brand-gold text-xs">Explore Wedding</span>
          </div>
        </Link>
      </motion.div>

      {/* Men's Collection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
      >
        <Link to="/category/men" className="group relative overflow-hidden aspect-[4/5] block rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&q=80"
            alt="Elegant cream sherwani with gold embroidery"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold-light">For Him</span>
            <h3 className="font-serif text-3xl lg:text-4xl text-cream mt-1 mb-3">Men's Collection</h3>
            <p className="text-sm text-cream/70 mb-4 max-w-sm">Sherwanis, kurtas, and indo-western wear for the modern Indian man.</p>
            <span className="btn-brand-gold text-xs">Shop Men</span>
          </div>
        </Link>
      </motion.div>
    </div>
  </section>
);

export default CollectionBanners;
