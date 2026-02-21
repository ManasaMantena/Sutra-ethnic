const AnnouncementBar = () => {
  return (
    <div className="bg-charcoal overflow-hidden">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-8 px-4">
            <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/90">Free Shipping on Orders Over $200</span>
            <span className="text-primary-foreground/40">✦</span>
            <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/90">Handcrafted in India · Delivered to USA</span>
            <span className="text-primary-foreground/40">✦</span>
            <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/90">Easy 30-Day Returns</span>
            <span className="text-primary-foreground/40">✦</span>
            <span className="text-xs tracking-[0.2em] uppercase text-primary-foreground/90">Authentic Heritage Craftsmanship</span>
            <span className="text-primary-foreground/40">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
