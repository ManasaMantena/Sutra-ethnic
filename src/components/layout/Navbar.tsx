import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, X } from 'lucide-react';
import { navigationData, secondaryNavLinks } from '@/data/navigation';
import { products } from '@/data/products';
import { searchProducts } from '@/utils/searchEngine';
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
  const location = useLocation();

  const handleEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMega(label);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMega(null), 150);
  };

  // close mega menu on route change
  useEffect(() => {
    setActiveMega(null);
  }, [location]);

  const searchSuggestions = [
    'Banarasi Saree', 'Wedding Lehenga', 'Sherwani', 'Silk Kurta', 'Anarkali',
    'Nehru Jacket', 'Patola', 'Diwali Collection', 'Under $150'
  ];

  const filteredSuggestions = searchQuery.length > 0
    ? searchSuggestions.filter(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // instant result buckets
  const [instantResults, setInstantResults] = useState<{
    products: typeof products;
    categories: { label: string; href: string }[];
    artisans: any[];
    articles: any[];
  }>({ products: [], categories: [], artisans: [], articles: [] });

  const findCategoryMatches = (q: string) => {
    const allLinks: { label: string; href: string }[] = [];
    navigationData.forEach(cat => {
      allLinks.push({ label: cat.label, href: cat.href });
      cat.columns.forEach(col => {
        col.links.forEach(l => allLinks.push({ label: l.label, href: l.href }));
      });
    });
    secondaryNavLinks.forEach(l => allLinks.push(l));
    return allLinks.filter(link => link.label.toLowerCase().includes(q));
  };

  // recalc results when query changes
  useEffect(() => {
    if (searchQuery.length >= 3) {
      const prods = searchProducts(searchQuery, products);
      const cats = findCategoryMatches(searchQuery.toLowerCase());
      setInstantResults({ products: prods, categories: cats, artisans: [], articles: [] });
    } else {
      setInstantResults({ products: [], categories: [], artisans: [], articles: [] });
    }
  }, [searchQuery]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      {/* Main nav */}
      <div className="container-luxury">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="font-serif text-3xl lg:text-4xl font-bold tracking-tight text-charcoal">
              SUTRA
            </h1>
          </Link>

          {/* Center nav */}
          <nav className="hidden lg:flex items-center gap-8" onMouseLeave={handleLeave}>
            {navigationData.map((cat) => (
              <div
                key={cat.label}
                onMouseEnter={() => handleEnter(cat.label)}
                className="relative group"
              >
                <Link
                  to={cat.href}
                  className={`text-xs font-medium tracking-[0.12em] uppercase transition-colors pb-1 border-b-2 ${
                    activeMega === cat.label
                      ? 'text-charcoal border-b-charcoal'
                      : 'text-charcoal border-b-transparent group-hover:border-b-charcoal'
                  }`}
                  onClick={() => setActiveMega(null)}
                >
                  {cat.label}
                </Link>
              </div>
            ))}
            {secondaryNavLinks.map((link) => (
              <div
                 key={link.label}
                className="relative group"
              >
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setActiveMega(null)}
                className="text-xs font-medium tracking-[0.12em] uppercase text-charcoal transition-colors pb-1 border-b-2 border-b-transparent hover:border-b-charcoal"
              >
                {link.label}
              </Link>
              </div>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-charcoal hover:text-gray-600 transition-colors"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </button>
            <Link to="/wishlist" className="text-charcoal hover:text-gray-600 transition-colors relative">
              <Heart className="h-5 w-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-charcoal text-white">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button className="text-charcoal hover:text-gray-600 transition-colors">
              <User className="h-5 w-5" />
            </button>
            <button
              onClick={() => openCart(true)}
              className="text-charcoal hover:text-gray-600 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center text-[9px] font-bold rounded-full bg-charcoal text-white">
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
          onLinkClick={() => setActiveMega(null)}
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
              {/* query less than 3 characters - show keyword suggestions */}
              {searchQuery.length > 0 && searchQuery.length < 3 && filteredSuggestions.length > 0 && (
                <div className="py-4 space-y-2">
                  {filteredSuggestions.map((s) => (
                    <Link
                      key={s}
                      to={`/category/search?q=${encodeURIComponent(s)}`}
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                    >
                      {s}
                    </Link>
                  ))}
                </div>
              )}

              {/* instant semantic dropdown triggered after 3+ chars */}
              {searchQuery.length >= 3 && (
                <div className="py-4 space-y-4">
                  {instantResults.products.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Products
                      </p>
                      <div className="space-y-2">
                        {instantResults.products.slice(0, 6).map((p) => (
                          <Link
                            key={p.id}
                            to={`/product/${p.slug}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                          >
                            {p.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {instantResults.categories.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                        Categories
                      </p>
                      <div className="space-y-2">
                        {instantResults.categories.slice(0, 6).map((c) => (
                          <Link
                            key={c.href}
                            to={c.href}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="block py-2 text-sm text-foreground hover:text-primary transition-colors"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {instantResults.products.length === 0 && instantResults.categories.length === 0 && (
                    <p className="text-sm text-muted-foreground">No results found</p>
                  )}
                </div>
              )}

              {searchQuery.length === 0 && (
                <div className="py-8">
                  <p className="subheading mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {searchSuggestions.map((s) => (
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
  onLinkClick,
}: {
  category: NavCategory;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onLinkClick: () => void;
}) => (
  <div
    className="absolute left-0 right-0 bg-white border-b border-gray-200 shadow-md z-50"
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <div className="container-luxury py-10">
      <div className="grid grid-cols-4 gap-12">
        {category.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-charcoal mb-6">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-charcoal hover:text-gray-600 transition-colors"
                    onClick={() => onLinkClick()}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-8 border-t border-gray-200">
        <Link to={category.href} onClick={() => onLinkClick()} className="text-xs font-medium tracking-[0.12em] uppercase text-charcoal hover:text-gray-600 transition-colors">
          View All {category.label} →
        </Link>
      </div>
    </div>
  </div>
);

export default Navbar;
