import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';

const FeaturedCollections = () => {
  const trending = products.filter(p => p.isBestseller || p.isNew).slice(0, 4);

  return (
    <section className="bg-cream-dark">
      <div className="container-luxury py-20 lg:py-28">
        <div className="flex items-end justify-between mb-14">
          <div>
            <span className="subheading">Curated for You</span>
            <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">Trending in USA</h2>
          </div>
          <Link to="/category/nri-favorites" className="btn-brand-outline text-xs hidden lg:inline-flex">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trending.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center lg:hidden">
          <Link to="/category/nri-favorites" className="btn-brand-outline text-xs">View All</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
