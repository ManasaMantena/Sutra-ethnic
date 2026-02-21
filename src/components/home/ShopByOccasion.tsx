import { Link } from 'react-router-dom';
import { occasions } from '@/data/products';

const icons: Record<string, string> = {
  wedding: '💍',
  festive: '🪔',
  sangeet: '💃',
  mehendi: '🌿',
  reception: '✨',
  casual: '🌸',
  pooja: '🕉️',
  cocktail: '🥂',
};

const ShopByOccasion = () => (
  <section className="container-luxury py-20 lg:py-28">
    <div className="text-center mb-14">
      <span className="subheading">Dress for Every Moment</span>
      <h2 className="heading-editorial text-3xl lg:text-4xl mt-3">Shop by Occasion</h2>
      <div className="divider-gold mt-4" />
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
      {occasions.map((occ) => (
        <Link
          key={occ.slug}
          to={`/category/occasion/${occ.slug}`}
          className="group relative bg-secondary hover:bg-primary/5 border border-border hover:border-primary/30 transition-all duration-300 p-8 text-center"
        >
          <span className="text-3xl mb-3 block">{icons[occ.slug] || '✦'}</span>
          <h3 className="font-serif text-lg text-foreground group-hover:text-primary transition-colors">{occ.name}</h3>
          <p className="text-xs text-muted-foreground mt-1">{occ.count}+ styles</p>
        </Link>
      ))}
    </div>
  </section>
);

export default ShopByOccasion;
