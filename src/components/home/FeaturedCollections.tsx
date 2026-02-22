import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '@/data/products';

const FeaturedCollections = () => {
  const trending = products.filter(p => p.isBestseller || p.isNew).slice(0, 6);

  return (
    <section className="bg-cream-dark">
      <div className="container-luxury py-20 lg:py-28">
        <div className="text-center mb-16">
          <span className="subheading">Curated for You</span>
          <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">Trending in USA</h2>
          <div className="divider-gold mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {trending.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
            >
              <Link
                to={`/product/${product.slug}`}
                className="group relative block overflow-hidden rounded-lg h-80 bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {product.images && product.images[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-sm text-gray-400">No image</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-lg text-cream mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-semibold text-gold">
                      ${product.price}
                    </span>
                    <span className="text-xs text-cream/60">
                      ★ 4.8
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
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
