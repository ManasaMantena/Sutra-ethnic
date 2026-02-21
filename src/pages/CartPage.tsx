import { Link } from 'react-router-dom';
import { Minus, Plus, X, ChevronRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import TrustBadges from '@/components/shared/TrustBadges';

const CartPage = () => {
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const shipping = subtotal >= 200 ? 0 : 14.99;
  const estimatedTax = subtotal * 0.08;
  const total = subtotal + shipping + estimatedTax;

  return (
    <div>
      <div className="container-luxury py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Shopping Bag</span>
        </nav>
      </div>

      <div className="container-luxury pb-20">
        <h1 className="heading-editorial text-3xl lg:text-4xl mb-10">Shopping Bag</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-foreground mb-3">Your bag is empty</p>
            <p className="text-sm text-muted-foreground mb-8">Looks like you haven't added anything yet</p>
            <Link to="/category/women" className="btn-brand">Start Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items */}
            <div className="lg:col-span-2 space-y-0">
              <div className="border-b border-border pb-3 mb-6 hidden lg:grid grid-cols-12 gap-4 text-xs tracking-[0.15em] uppercase text-muted-foreground">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="grid grid-cols-12 gap-4 py-6 border-b border-border items-center">
                  <div className="col-span-12 lg:col-span-6 flex gap-4">
                    <div className="w-24 h-32 bg-secondary flex-shrink-0 flex items-center justify-center">
                      <span className="text-[8px] text-muted-foreground text-center px-1">{item.product.name}</span>
                    </div>
                    <div>
                      <Link to={`/product/${item.product.slug}`} className="font-serif text-sm text-foreground hover:text-primary">{item.product.name}</Link>
                      <p className="text-xs text-muted-foreground mt-1">{item.product.fabric}</p>
                      <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                      <button onClick={() => removeItem(item.product.id)} className="text-xs text-muted-foreground hover:text-destructive mt-2 flex items-center gap-1">
                        <X className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2 flex items-center justify-center">
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary">
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="h-8 w-8 flex items-center justify-center text-xs font-medium border-x border-border">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary">
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <div className="col-span-4 lg:col-span-2 text-center text-sm text-foreground">${item.product.price}</div>
                  <div className="col-span-4 lg:col-span-2 text-right text-sm font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="border border-border p-6 sticky top-32">
                <h2 className="font-serif text-lg text-foreground mb-6">Order Summary</h2>
                <div className="space-y-3 text-sm mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Est. Tax</span>
                    <span className="text-foreground">${estimatedTax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo */}
                <div className="border-t border-border pt-4 mb-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-3 py-2 text-xs bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                    />
                    <button className="btn-brand-outline text-[10px] px-3 py-2">Apply</button>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between text-base font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Link to="/checkout" className="btn-brand w-full text-center block mb-3">Proceed to Checkout</Link>
                <Link to="/category/women" className="btn-brand-outline w-full text-center block text-xs">Continue Shopping</Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <TrustBadges />
    </div>
  );
};

export default CartPage;
