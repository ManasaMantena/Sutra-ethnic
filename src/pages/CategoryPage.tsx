import { useState, useMemo } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { products } from '@/data/products';
import { searchProducts } from '@/utils/searchEngine';
import ProductCard from '@/components/product/ProductCard';
import ComingSoon from '@/components/common/ComingSoon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const fabrics = ['All', 'Silk', 'Cotton', 'Georgette', 'Brocade'];
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under $150', min: 0, max: 150 },
  { label: '$150 – $300', min: 150, max: 300 },
  { label: '$300 – $600', min: 300, max: 600 },
  { label: '$600 – $1000', min: 600, max: 1000 },
  { label: 'Over $1000', min: 1000, max: Infinity },
];
const genders = ['All', 'Women', 'Men'];

// helper used by component and tests to derive filtered product list
export function filterProducts(
  productsList: typeof products,
  slug: string | undefined,
  genderFilter: string,
  fabricFilter: string,
  priceFilter: number,
  sortBy: string
) {
  let result = [...productsList];
  const slugParts = slug ? slug.toLowerCase().split('/').filter(Boolean) : [];

  if (slugParts.length > 0) {
    const mainCategory = slugParts[0];

    if (mainCategory === 'women' || mainCategory === 'men') {
      result = result.filter(p => p.gender === mainCategory);

      if (slugParts[1] === 'sarees') {
        result = result.filter(p => p.category === 'Sarees');
        if (slugParts[2]) {
          const fabricType = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p =>
            p.subcategory?.toLowerCase().includes(fabricType.toLowerCase()) ||
            p.fabric?.toLowerCase().includes(fabricType.toLowerCase())
          );
        }
      } else if (slugParts[1] === 'lehengas') {
        result = result.filter(p => p.category === 'Lehengas');
        if (slugParts[2]) {
          const type = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p => p.subcategory?.toLowerCase().includes(type.toLowerCase()));
        }
      } else if (slugParts[1] === 'sherwanis') {
        result = result.filter(p => p.category === 'Sherwanis');
        if (slugParts[2]) {
          const type = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p => p.subcategory?.toLowerCase().includes(type.toLowerCase()));
        }
      } else if (slugParts[1] === 'kurtas') {
        result = result.filter(p => p.category === 'Kurtas');
        if (slugParts[2]) {
          const type = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p =>
            p.subcategory?.toLowerCase().includes(type.toLowerCase()) ||
            p.fabric?.toLowerCase().includes(type.toLowerCase())
          );
        }
      } else if (slugParts[1] === 'suits') {
        result = result.filter(p => p.category === 'Suits');
        if (slugParts[2]) {
          const type = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p => p.subcategory?.toLowerCase().includes(type.toLowerCase()));
        }
      } else if (slugParts[1] === 'indo-western') {
        result = result.filter(p => p.category === 'Indo-Western');
        if (slugParts[2]) {
          const type = slugParts[2].replace(/-/g, ' ');
          result = result.filter(p => p.subcategory?.toLowerCase().includes(type.toLowerCase()));
        }
      } else if (slugParts[1] === 'occasion') {
        if (slugParts[2]) {
          const occasion = slugParts[2].replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
          result = result.filter(p => p.occasion.some(o => o.toLowerCase().includes(occasion.toLowerCase())));
        }
      }
    } else if (mainCategory === 'jewelry') {
      // use case-insensitive comparison to avoid mismatches
      result = result.filter(p => p.category.toLowerCase() === 'jewellery');
      if (slugParts[1]) {
        const type = slugParts[1].replace(/-/g, ' ');
        result = result.filter(p => p.subcategory?.toLowerCase().includes(type.toLowerCase()));
      }
    } else if (mainCategory === 'wedding') {
      result = result.filter(p => p.occasion.some(o => o.toLowerCase().includes('wedding')));
      if (slugParts[1]) {
        const type = slugParts[1].replace(/-/g, ' ');
        result = result.filter(p =>
          p.subcategory?.toLowerCase().includes(type.toLowerCase()) ||
          p.category?.toLowerCase().includes(type.toLowerCase())
        );
      }
    } else if (mainCategory === 'festive') {
      result = result.filter(p => p.occasion.some(o => ['festival', 'diwali', 'navratri', 'eid', 'pongal', 'onam'].some(occ => o.toLowerCase().includes(occ))));
      if (slugParts[1]) {
        const type = slugParts[1].replace(/-/g, ' ');
        result = result.filter(p =>
          p.subcategory?.toLowerCase().includes(type.toLowerCase()) ||
          p.tags?.some(t => t.toLowerCase().includes(type.toLowerCase()))
        );
      }
    } else if (mainCategory === 'gifting') {
      // only include products whose primary category is exactly "Gifting" (case-insensitive)
      result = result.filter(p => p.category.toLowerCase() === 'gifting');
    } else if (mainCategory === 'under-150') {
      result = result.filter(p => p.price < 150);
    } else if (mainCategory === 'nri-favorites') {
      result = result.filter(p => p.tags?.some(t => t.toLowerCase().includes('bestseller')) || p.rating >= 4.7);
    }
  }

  if (genderFilter !== 'All') {
    result = result.filter(p => p.gender === genderFilter.toLowerCase());
  }

  if (fabricFilter !== 'All') {
    result = result.filter(p => p.fabric.toLowerCase().includes(fabricFilter.toLowerCase()));
  }

  const range = priceRanges[priceFilter];
  result = result.filter(p => p.price >= range.min && p.price < range.max);

  switch (sortBy) {
    case 'price-low': result.sort((a, b) => a.price - b.price); break;
    case 'price-high': result.sort((a, b) => b.price - a.price); break;
    case 'newest': result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    case 'rating': result.sort((a, b) => b.rating - a.rating); break;
  }

  return result;
}

const CategoryPage = () => {
  const { '*': slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const [sortBy, setSortBy] = useState('featured');
  const [fabricFilter, setFabricFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState(0);
  const [genderFilter, setGenderFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(true);

  const isSearch = slug?.toLowerCase().startsWith('search');
  const categoryName = isSearch
    ? `Search results for "${searchQuery}"`
    : slug
      ? slug.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : 'All Products';

  const slugBase = slug ? slug.toLowerCase().split('/').filter(Boolean)[0] : null;
  const isHomeCategory = slugBase === 'home';

  const filtered = useMemo(() => {
    if (isSearch) {
      // semantic/keyword search result page
      return searchProducts(searchQuery, products);
    }
    return filterProducts(products, slug, genderFilter, fabricFilter, priceFilter, sortBy);
  }, [slug, sortBy, fabricFilter, priceFilter, genderFilter, searchQuery, isSearch]);

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container-luxury py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{categoryName}</span>
        </nav>
      </div>

      {/* Header */}
      <div className="container-luxury pb-8">
        <h1 className="heading-editorial text-3xl lg:text-4xl">{categoryName}</h1>
        <p className="text-sm text-muted-foreground mt-2">{filtered.length} products</p>
      </div>

      <div className="container-luxury pb-20">
            {isHomeCategory ? (
              <ComingSoon />
            ) : (
              <>
                {/* Toolbar */}
                <div className="flex items-center justify-between border-t border-b border-border py-3 mb-8">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center gap-2 text-xs tracking-wider uppercase text-foreground hover:text-primary transition-colors"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 border-0 shadow-none text-xs tracking-wider uppercase bg-transparent">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border border-border z-50">
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-10">
                  {/* Filters sidebar */}
                  {showFilters && (
                    <aside className="w-56 flex-shrink-0 space-y-8">
                      {/* Gender */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-3">Category</h3>
                        <div className="space-y-2">
                          {genders.map(g => (
                            <button
                              key={g}
                              onClick={() => setGenderFilter(g)}
                              className={`block text-sm transition-colors ${genderFilter === g ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-3">Price</h3>
                        <div className="space-y-2">
                          {priceRanges.map((range, i) => (
                            <button
                              key={range.label}
                              onClick={() => setPriceFilter(i)}
                              className={`block text-sm transition-colors ${priceFilter === i ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                              {range.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Fabric */}
                      <div>
                        <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-3">Fabric</h3>
                        <div className="space-y-2">
                          {fabrics.map(f => (
                            <button
                              key={f}
                              onClick={() => setFabricFilter(f)}
                              className={`block text-sm transition-colors ${fabricFilter === f ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>
                    </aside>
                  )}

                  {/* Product grid */}
                  <div className="flex-1">
                    {filtered.length === 0 ? (
                      <div className="text-center py-20">
                        <p className="font-serif text-xl text-foreground mb-2">No products found</p>
                        <p className="text-sm text-muted-foreground">Try adjusting your filters</p>
                      </div>
                    ) : (
                      <div className={`grid gap-6 lg:gap-8 ${showFilters ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2 lg:grid-cols-4'}`}>
                        {filtered.map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
    </div>
  );
};

export default CategoryPage;
