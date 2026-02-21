import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, X } from 'lucide-react';
import { navigationData, secondaryNavLinks } from '@/data/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import type { NavCategory } from '@/types';

const Navbar = () => {
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setIsOpen: openCart, itemCount } = useCart();
  const { items: wishlistItems } = useWishlist();

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  const searchSuggestions = [
    'Banarasi Saree', 'Wedding Lehenga', 'Sherwani', 'Silk Kurta', 'Anarkali',
    'Nehru Jacket', 'Patola', 'Diwali Collection', 'Under $150'
  ];

  const filteredSuggestions = searchQuery.length > 0
    ? searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border">
      {/* Main nav */}
      <div className="container-luxury">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-serif text-2xl lg:text-3xl font-semibold tracking-tight text-foreground">
              SUTRA
            </h1>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-1" onMouseLeave={handleLeave}>
            {navigationData.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => handleEnter(cat.label)}
                className="relative"
              >
                <Link
                  to={cat.href}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase transition-colors ${
                    activeMega === cat.label ? 'text-primary' : 'text-foreground hover:text-primary'
                  }`}
                >
                  {cat.label}
                </Link>
              </div>
            ))}
            {secondaryNavLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="px-4 py-2 text-xs font-medium tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="p-2 text-foreground hover:text-primary transition-colors relative">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-primary text-primary-foreground">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button className="p-2 text-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={() => openCart(true)}
              className="p-2 text-foreground hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-primary text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMega && (
        <MegaMenuContent
          category={navigationData.find(c => c.label === activeMega)!}
          onMouseEnter={() => handleEnter(activeMega)}
          onMouseLeave={handleLeave}
        />
      )}

      {/* Search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[60] bg-card/98 backdrop-blur-sm">
          <div className="container-luxury pt-24">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center gap-4 border-b border-border pb-4">
                <Search className="h-5 w-5 text-muted-foreground" />
                <input
                  type="text"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for sarees, lehengas, sherwanis..."
                  className="flex-1 bg-transparent text-xl font-serif text-foreground placeholder:text-muted-foreground outline-none"
                />
                <button onClick={() => { setSearchOpen(false); setSearchQuery(''); }} className="p-2 text-foreground">
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filteredSuggestions.length > 0 && (
                <div className="py-4 space-y-2">
                  {filteredSuggestions.map(s => (
                    <Link
                      key={s}
                      to={`/category/search?q=${encodeURIComponent(s)}`}
                      onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                      className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}
              {searchQuery.length === 0 && (
                <div className="py-8">
                  <p className="subheading mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map(s => (
                      <button
                        key={s}
                        onClick={() => setSearchQuery(s)}
                        className="px-4 py-2 text-xs tracking-wider uppercase border border-border text-foreground hover:border-primary hover:text-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const MegaMenuContent = ({
  category,
  onMouseEnter,
  onMouseLeave,
}: {
  category: NavCategory;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) => (
  <div
    className="absolute left-0 right-0 bg-card border-b border-border shadow-lg z-50"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="container-luxury py-8">
      <div className="grid grid-cols-4 gap-8">
        {category.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-4">{col.title}</h3>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <Link to={category.href} className="text-xs font-medium tracking-[0.15em] uppercase text-primary hover:text-accent transition-colors">
          View All {category.label} →
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
