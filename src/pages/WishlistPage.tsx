import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/product/ProductCard';

const WishlistPage = () => {
  const { items } = useWishlist();

  return (
    <div>
      <div className="container-luxury py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Wishlist</span>
        </nav>
      </div>

      <div className="container-luxury pb-20">
        <h1 className="heading-editorial text-3xl lg:text-4xl mb-10">My Wishlist</h1>
        <p className="text-sm text-muted-foreground mb-8">{items.length} items</p>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-foreground mb-3">Your wishlist is empty</p>
            <p className="text-sm text-muted-foreground mb-8">Add your favorite items to get started</p>
            <Link to="/category/women" className="btn-brand">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:gap-8 grid-cols-2 lg:grid-cols-4">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
