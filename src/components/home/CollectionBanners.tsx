import { Link } from 'react-router-dom';
import weddingImg from '@/assets/wedding-collection.jpg';
import mensImg from '@/assets/mens-collection.jpg';

const CollectionBanners = () => (
  <section className="container-luxury py-20 lg:py-28">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Wedding Collection */}
      <Link to="/category/wedding" className="group relative overflow-hidden aspect-[4/5]">
        <img
          src={weddingImg}
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

      {/* Men's Collection */}
      <Link to="/category/men" className="group relative overflow-hidden aspect-[4/5]">
        <img
          src={mensImg}
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
    </div>
  </section>
);

export default CollectionBanners;
