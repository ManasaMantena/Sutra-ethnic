import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const categoryPreviews = [
  { label: 'Gifting', href: '/category/gifting', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=300&q=80' },
  { label: 'Jewelry', href: '/category/jewelry', image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=300&q=80' },
  { label: 'Festive', href: '/category/festive', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300&q=80' },
  { label: 'Home', href: '/category/home', image: 'https://images.unsplash.com/photo-1595521624512-1b0fb86e7c49?w=300&q=80' },
  { label: 'Women', href: '/category/women', image: 'https://images.unsplash.com/photo-1615572320829-c6fb7f5a9869?w=300&q=80' },
  { label: 'Men', href: '/category/men', image: 'https://images.unsplash.com/photo-1622445275576-721325763afe?w=300&q=80' },
];

const CollectionShowcase = () => {
  return (
    <section className="bg-white overflow-hidden">
      {/* Large Hero Visuals */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-0"> */}
        {/* Wedding Collection - Left */}
        {/* <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden h-96 lg:h-full min-h-[400px] lg:min-h-[500px]"
        >
          <Link to="/category/wedding" className="block w-full h-full group">
            <img
              src="https://images.unsplash.com/photo-1593032465171-8e7f4d92a76d?w=800&q=80"
              alt="Indian wedding couple"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold-light">Wedding</span>
              <h3 className="font-serif text-2xl lg:text-3xl text-cream mt-2">Indian Wedding Collection</h3>
            </div>
          </Link>
        </motion.div> */}

        {/* Premium Celebration - Right */}
        {/* <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden h-96 lg:h-full min-h-[400px] lg:min-h-[500px]"
        >
          <Link to="/category/festive" className="block w-full h-full group">
            <img
              src="https://images.unsplash.com/photo-1514562141207-6811c3acd565?w=800&q=80"
              alt="Premium celebration wear"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold-light">Celebration</span>
              <h3 className="font-serif text-2xl lg:text-3xl text-cream mt-2">Festive & Premium Wear</h3>
            </div>
          </Link>
        </motion.div> */}
      {/* </div> */}

      {/* Category Previews Grid */}
      <div className="container-luxury py-16 lg:py-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl lg:text-3xl text-charcoal mb-4">Explore Collections</h2>
          <div className="divider-gold mx-auto" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {categoryPreviews.map((cat, idx) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <Link to={cat.href} className="group block overflow-hidden rounded-lg h-48 relative">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-center h-full opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="font-serif text-cream text-lg">{cat.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionShowcase;
