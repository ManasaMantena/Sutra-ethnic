import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import type { Product } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';

interface ProductCardProps {
  product: Product;
}

// Generate a deterministic gradient for products without images
const gradients = [
  'from-amber-100 to-orange-50',
  'from-stone-200 to-amber-50',
  'from-emerald-50 to-teal-50',
  'from-slate-100 to-stone-100',
  'from-amber-50 to-yellow-50',
  'from-rose-50 to-stone-50',
  'from-teal-50 to-emerald-50',
  'from-indigo-50 to-slate-100',
];

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const gradientClass = gradients[parseInt(product.id) % gradients.length];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative">
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-[3/4] bg-secondary">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <span className="font-serif text-lg text-muted-foreground/40 text-center px-4">{product.name}</span>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-card text-foreground">New</span>
          )}
          {product.isBestseller && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-primary text-primary-foreground">Bestseller</span>
          )}
          {discount > 0 && (
            <span className="px-2.5 py-1 text-[10px] font-medium tracking-[0.2em] uppercase bg-accent text-accent-foreground">{discount}% Off</span>
          )}
        </div>

        {/* Hover actions */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={(e) => { e.preventDefault(); addItem(product, product.sizes[0]); }}
            className="flex-1 btn-brand text-xs py-2.5 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            Add to Bag
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="btn-brand-outline bg-card text-xs py-2.5 px-3"
            onClick={(e) => e.stopPropagation()}
          >
            <Eye className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Link>

      {/* Wishlist */}
      <button
        onClick={() => toggleWishlist(product)}
        className="absolute top-3 right-3 h-8 w-8 flex items-center justify-center bg-card/80 backdrop-blur-sm rounded-full transition-colors hover:bg-card"
      >
        <Heart className={`h-4 w-4 ${wishlisted ? 'fill-primary text-primary' : 'text-foreground'}`} />
      </button>

      {/* Info */}
      <div className="mt-3 space-y-1">
        <p className="subheading text-[10px]">{product.category}</p>
        <Link to={`/product/${product.slug}`} className="block">
          <h3 className="font-serif text-sm leading-snug text-foreground group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">${product.originalPrice}</span>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground">{product.fabric}</p>
      </div>
    </div>
  );
};

export default ProductCard;
