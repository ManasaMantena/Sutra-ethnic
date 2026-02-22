import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Heart, Minus, Plus, Star, Truck, RotateCcw, Shield } from 'lucide-react';
import { products, reviews } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import ProductCard from '@/components/product/ProductCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SizeGuideModal from '@/components/common/SizeGuideModal';

const ProductPage = () => {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug) || products[0];
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  // size guide modal state
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);

  const relatedProducts = products.filter(p => p.id !== product.id && p.gender === product.gender).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedSize);
    }
  };

  return (
    <div>
      {/* Breadcrumbs */}
      <div className="container-luxury py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to={`/category/${product.gender}`} className="hover:text-foreground capitalize">{product.gender}</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Product Section */}
      <div className="container-luxury pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[3/4] bg-secondary flex items-center justify-center">
            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
              {/* <span className="font-serif text-lg text-muted-foreground/40 text-center px-8">{product.name}</span> */}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-secondary cursor-pointer hover:opacity-80 transition-opacity" />
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="lg:py-4">
            <span className="subheading">{product.category}</span>
            <h1 className="heading-editorial text-3xl lg:text-4xl mt-2 mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3.5 w-3.5 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-border'}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-2xl font-serif font-semibold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                  <span className="text-xs font-medium tracking-wider uppercase text-primary">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% Off
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-8">{product.description}</p>

            {/* Fabric */}
            <div className="mb-6">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-1">Fabric</p>
              <p className="text-sm text-muted-foreground">{product.fabric}</p>
            </div>

            {/* Size */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground">Size</p>
                <button
                  className="text-xs text-primary underline"
                  onClick={() => setSizeGuideOpen(true)}
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[48px] h-10 px-4 text-xs font-medium border transition-colors ${
                      selectedSize === size
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border text-foreground hover:border-primary'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-0 border border-border w-fit">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-secondary">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="h-10 w-12 flex items-center justify-center text-sm font-medium border-x border-border">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center text-foreground hover:bg-secondary">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart} className="btn-brand flex-1">
                Add to Bag — ${(product.price * quantity).toFixed(0)}
              </button>
              <button onClick={handleAddToCart} className="btn-brand flex-1">
                Shop Now
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`h-12 w-12 flex items-center justify-center border transition-colors ${
                  wishlisted ? 'border-primary bg-primary/5' : 'border-border hover:border-primary'
                }`}
              >
                <Heart className={`h-5 w-5 ${wishlisted ? 'fill-primary text-primary' : 'text-foreground'}`} />
              </button>
            </div>

            {/* Delivery */}
            <div className="border border-border p-4 space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <Truck className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-foreground">Estimated Delivery to USA</p>
                  <p className="text-xs text-muted-foreground">{product.deliveryDays}–{product.deliveryDays + 3} business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Free 30-day returns & exchanges</p>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-primary" />
                <p className="text-xs text-muted-foreground">Authenticity guaranteed</p>
              </div>
            </div>

            {/* Gift option */}
            <div className="border border-border p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="h-4 w-4 rounded border-border text-primary" />
                <div>
                  <p className="text-xs font-medium text-foreground">Add Gift Packaging — $12</p>
                  <p className="text-xs text-muted-foreground">Premium box with handwritten note card</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <Tabs defaultValue="story" className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none h-auto p-0 gap-0">
              {['story', 'fabric', 'reviews', 'styling'].map(tab => (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-xs tracking-[0.15em] uppercase"
                >
                  {tab === 'story' ? 'Craft Story' : tab === 'fabric' ? 'Fabric Details' : tab === 'reviews' ? `Reviews (${product.reviewCount})` : 'Styling Guide'}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="story" className="py-8 max-w-2xl">
              <h3 className="font-serif text-xl text-foreground mb-4">The Story Behind This Piece</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.craftStory}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{product.artisanNote}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.culturalMeaning}</p>
            </TabsContent>

            <TabsContent value="fabric" className="py-8 max-w-2xl">
              <h3 className="font-serif text-xl text-foreground mb-4">Fabric & Care</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.fabricDetails}</p>
            </TabsContent>

            <TabsContent value="reviews" className="py-8">
              <div className="max-w-2xl space-y-6">
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="border-b border-border pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-primary text-primary' : 'text-border'}`} />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-foreground">{review.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.body}</p>
                    <p className="text-xs text-muted-foreground">{review.author} · {review.location}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="styling" className="py-8 max-w-2xl">
              <h3 className="font-serif text-xl text-foreground mb-4">How to Style</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{product.stylingGuide}</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* size guide modal */}
      <SizeGuideModal open={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} />

      {/* Complete the Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="text-center mb-12">
              <span className="subheading">Complete the Look</span>
              <h2 className="heading-editorial text-2xl lg:text-3xl mt-3">You May Also Love</h2>
              <div className="divider-gold mt-4" />
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
