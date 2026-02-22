import { Minus, Plus, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { Link } from 'react-router-dom';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal, itemCount } = useCart();

  const freeShippingThreshold = 200;
  const remaining = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md bg-card flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-serif text-xl">Shopping Bag ({itemCount})</SheetTitle>
        </SheetHeader>

        {/* Free shipping bar */}
        {subtotal > 0 && (
          <div className="py-3 border-b border-border">
            {remaining > 0 ? (
              <>
                <p className="text-xs text-muted-foreground mb-2">
                  Add <span className="font-semibold text-foreground">${remaining.toFixed(0)}</span> more for free shipping
                </p>
                <div className="h-1 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(subtotal / freeShippingThreshold) * 100}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs text-primary font-medium">✓ You qualify for free shipping!</p>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-serif text-lg text-foreground mb-2">Your bag is empty</p>
              <p className="text-sm text-muted-foreground mb-6">Discover handcrafted treasures from India</p>
              <button onClick={() => setIsOpen(false)} className="btn-brand">Continue Shopping</button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                <div className="w-20 h-24 bg-secondary flex-shrink-0 flex items-center justify-center">
                  {/* <span className="text-[9px] text-muted-foreground text-center px-1">{item.product.name}</span> */}
                  <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" /> 
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-serif text-sm text-foreground truncate">{item.product.name}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.product.fabric} · Size: {item.size}</p>
                  <p className="text-sm font-medium text-foreground mt-1">${item.product.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="h-6 w-6 flex items-center justify-center border border-border text-foreground hover:border-primary"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="h-6 w-6 flex items-center justify-center border border-border text-foreground hover:border-primary"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeItem(item.product.id)} className="self-start p-1 text-muted-foreground hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {items.length > 0 && (
          <div className="border-t border-border pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="text-foreground">{remaining <= 0 ? 'Free' : 'Calculated at checkout'}</span>
            </div>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-brand w-full text-center block"
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsOpen(false)}
              className="btn-brand-outline w-full text-center block"
            >
              View Bag
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
