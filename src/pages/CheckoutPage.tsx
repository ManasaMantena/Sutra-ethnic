import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Shield, Truck, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const shipping = subtotal >= 200 ? 0 : 14.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const [step, setStep] = useState<'info' | 'shipping' | 'payment' | 'confirmation'>('info');

  if (items.length === 0) {
    return (
      <div className="container-luxury py-20 text-center">
        <p className="font-serif text-2xl text-foreground mb-4">No items in your bag</p>
        <Link to="/" className="btn-brand">Return Home</Link>
      </div>
    );
  }

  return (
    <div>
      <div className="container-luxury py-4">
        <nav className="flex items-center gap-2 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3 w-3" />
          <Link to="/cart" className="hover:text-foreground">Bag</Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground">Checkout</span>
        </nav>
      </div>

      <div className="container-luxury pb-20">
        <h1 className="heading-editorial text-3xl mb-10">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10 text-xs tracking-[0.15em] uppercase">
          {(['info', 'shipping', 'payment'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-4">
              {i > 0 && <div className="w-8 h-px bg-border" />}
              <button
                onClick={() => setStep(s)}
                className={step === s ? 'text-primary font-semibold' : 'text-muted-foreground'}
              >
                {i + 1}. {s === 'info' ? 'Information' : s === 'shipping' ? 'Shipping' : 'Payment'}
              </button>
            </div>
          ))}
        </div>

        {step === 'confirmation' ? (
          <div className="text-center py-20 max-w-lg mx-auto">
            <div className="text-4xl mb-4">✦</div>
            <h2 className="font-serif text-3xl text-foreground mb-4">Thank You for Your Order</h2>
            <p className="text-sm text-muted-foreground mb-8">
              Your handcrafted pieces are being prepared with love. You'll receive an email confirmation shortly
              with tracking details.
            </p>
            <Link to="/" className="btn-brand">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              {step === 'info' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 border border-border bg-secondary/50">
                    <span className="text-sm text-foreground">Already have an account? <button className="text-primary underline">Sign in</button></span>
                    <span className="text-muted-foreground">or</span>
                    <span className="text-sm font-medium text-foreground">Continue as Guest</span>
                  </div>

                  <div>
                    <h2 className="font-serif text-lg text-foreground mb-4">Contact Information</h2>
                    <input placeholder="Email address" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mb-3" />
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                      <input type="checkbox" className="rounded border-border" defaultChecked />
                      Email me about new collections and offers
                    </label>
                  </div>

                  <div>
                    <h2 className="font-serif text-lg text-foreground mb-4">Shipping Address</h2>
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="First name" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                      <input placeholder="Last name" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                    </div>
                    <input placeholder="Address" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mt-3" />
                    <input placeholder="Apartment, suite, etc. (optional)" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mt-3" />
                    <div className="grid grid-cols-3 gap-3 mt-3">
                      <input placeholder="City" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                      <input placeholder="State" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                      <input placeholder="ZIP code" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                    </div>
                    <input placeholder="Phone" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary mt-3" />
                  </div>

                  <button onClick={() => setStep('shipping')} className="btn-brand">Continue to Shipping</button>
                </div>
              )}

              {step === 'shipping' && (
                <div className="space-y-6">
                  <h2 className="font-serif text-lg text-foreground mb-4">Shipping Method</h2>
                  <div className="space-y-3">
                    {[
                      { label: 'Standard Shipping (7-12 business days)', price: subtotal >= 200 ? 'Free' : '$14.99' },
                      { label: 'Express Shipping (4-6 business days)', price: '$29.99' },
                      { label: 'Priority Shipping (2-3 business days)', price: '$49.99' },
                    ].map((method, i) => (
                      <label key={i} className="flex items-center justify-between p-4 border border-border cursor-pointer hover:border-primary transition-colors">
                        <div className="flex items-center gap-3">
                          <input type="radio" name="shipping" defaultChecked={i === 0} className="text-primary" />
                          <span className="text-sm text-foreground">{method.label}</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">{method.price}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('info')} className="btn-brand-outline">Back</button>
                    <button onClick={() => setStep('payment')} className="btn-brand">Continue to Payment</button>
                  </div>
                </div>
              )}

              {step === 'payment' && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lock className="h-4 w-4 text-primary" />
                    <h2 className="font-serif text-lg text-foreground">Secure Payment</h2>
                  </div>
                  <div className="border border-border p-6 space-y-4">
                    <input placeholder="Card number" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                    <input placeholder="Name on card" className="w-full px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                    <div className="grid grid-cols-2 gap-3">
                      <input placeholder="MM / YY" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                      <input placeholder="CVV" className="px-4 py-3 text-sm bg-transparent border border-border text-foreground placeholder:text-muted-foreground outline-none focus:border-primary" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-secondary text-xs text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Your payment information is encrypted with 256-bit SSL
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep('shipping')} className="btn-brand-outline">Back</button>
                    <button onClick={() => setStep('confirmation')} className="btn-brand">Place Order — ${total.toFixed(2)}</button>
                  </div>
                </div>
              )}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="border border-border p-6 sticky top-32">
                <h2 className="font-serif text-lg text-foreground mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-14 h-18 bg-secondary flex-shrink-0 flex items-center justify-center relative">
                        <span className="absolute -top-1.5 -right-1.5 h-5 w-5 flex items-center justify-center text-[9px] font-bold rounded-full bg-charcoal text-cream">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">{item.size}</p>
                      </div>
                      <span className="text-xs font-medium text-foreground">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2 text-sm">
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
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
                    <span className="text-foreground">Total</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
