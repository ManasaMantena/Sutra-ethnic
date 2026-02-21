import { Shield, Truck, RotateCcw, Award } from 'lucide-react';

const badges = [
  { icon: Truck, label: 'Free USA Shipping', sub: 'On orders $200+' },
  { icon: Shield, label: 'Secure Checkout', sub: '256-bit SSL encryption' },
  { icon: RotateCcw, label: '30-Day Returns', sub: 'Hassle-free exchanges' },
  { icon: Award, label: 'Authenticity Guaranteed', sub: 'Handcrafted in India' },
];

const TrustBadges = () => (
  <section className="border-t border-b border-border">
    <div className="container-luxury py-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {badges.map(({ icon: Icon, label, sub }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">{label}</p>
              <p className="text-[11px] text-muted-foreground">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustBadges;
