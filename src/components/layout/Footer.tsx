import { Link } from 'react-router-dom';

const footerLinks = {
  shop: [
    { label: 'Women', href: '/category/women' },
    { label: 'Men', href: '/category/men' },
    { label: 'Jewelry', href: '/category/jewelry' },
    { label: 'Wedding', href: '/category/wedding' },
    { label: 'Festive Edit', href: '/category/festive' },
    { label: 'Under $150', href: '/category/under-150' },
  ],
  help: [
    { label: 'Shipping & Delivery', href: '#' },
    { label: 'Returns & Exchanges', href: '#' },
    { label: 'Size Guide', href: '#' },
    { label: 'Track Order', href: '#' },
    { label: 'Contact Us', href: '#' },
    { label: 'FAQ', href: '#' },
  ],
  about: [
    { label: 'Our Story', href: '/story' },
    { label: 'Artisan Partners', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Careers', href: '#' },
  ],
};

const Footer = () => (
  <footer className="bg-charcoal text-cream">
    <div className="container-luxury py-16 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Brand */}
        <div className="lg:col-span-2">
          <h2 className="font-serif text-3xl font-semibold tracking-tight mb-4">SUTRA</h2>
          <p className="text-sm leading-relaxed text-cream/70 max-w-sm mb-6">
            Heritage reimagined. We bring India's finest craftsmanship to the global
            diaspora — handcrafted with love, steeped in tradition, delivered to your door.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-px bg-gold" />
            <span className="text-[10px] tracking-[0.3em] uppercase text-gold">From India, With Love</span>
          </div>
        </div>

        {/* Links */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <h3 className="text-xs font-semibold tracking-[0.25em] uppercase text-gold mb-5">{title}</h3>
            <ul className="space-y-3">
              {links.map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="text-sm text-cream/60 hover:text-cream transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col lg:flex-row items-center justify-between gap-4">
        <p className="text-xs text-cream/40">© 2026 Sutra. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <span className="text-xs text-cream/40">Privacy Policy</span>
          <span className="text-xs text-cream/40">Terms of Service</span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-cream/40 tracking-wider">SHIPS TO USA 🇺🇸</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
