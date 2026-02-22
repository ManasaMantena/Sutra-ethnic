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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                className="group flex gap-4 p-4 rounded-lg hover:bg-white/50 transition-all duration-300"
              >
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
                  {product.images && product.images[0] ? (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-xs text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 flex flex-col justify-center py-2">
                  <h3 className="font-serif text-base text-charcoal group-hover:text-gold transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-1">
                    {product.fabric}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-lg font-semibold text-gold">
                      ${product.price}
                    </span>
                    <span className="text-xs text-gold flex items-center gap-1">
                      ★ {product.rating || 4.8}
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
