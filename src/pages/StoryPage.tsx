import { Link } from 'react-router-dom';
import artisanImg from '@/assets/artisan-story.jpg';
import heroImg from '@/assets/hero-banner.jpg';

const StoryPage = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
      <img src={heroImg} alt="Indian silk craftsmanship" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-charcoal/60" />
      <div className="relative container-luxury h-full flex items-center justify-center text-center">
        <div>
          <span className="text-[10px] tracking-[0.35em] uppercase text-gold-light">Our Story</span>
          <h1 className="font-serif text-5xl lg:text-6xl text-cream mt-3">Heritage Reimagined</h1>
        </div>
      </div>
    </section>

    {/* Mission */}
    <section className="container-luxury py-20 lg:py-28">
      <div className="max-w-3xl mx-auto text-center">
        <div className="divider-gold mb-8" />
        <h2 className="font-serif text-3xl lg:text-4xl text-foreground leading-snug mb-6">
          We believe that wearing your heritage should feel like coming home — no matter where in the world you are.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
          Sutra was born from a simple longing: the ache of being far from India during festivals, weddings,
          and celebrations. We wanted to create a bridge — one woven with the finest threads of Indian
          craftsmanship, designed for the modern diaspora.
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Every piece in our collection is handcrafted by artisan families who have perfected their craft
          over generations. When you wear Sutra, you don't just wear clothes — you wear stories, traditions,
          and the warmth of belonging.
        </p>
      </div>
    </section>

    {/* Artisan section */}
    <section className="bg-charcoal">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="aspect-square lg:aspect-auto relative">
          <img src={artisanImg} alt="Artisan weaving" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="flex items-center py-16 lg:py-24 px-8 lg:px-16 xl:px-24">
          <div className="max-w-lg">
            <span className="text-[10px] tracking-[0.35em] uppercase text-gold">Our Artisans</span>
            <h2 className="font-serif text-3xl text-cream mt-4 mb-6">Guardians of Tradition</h2>
            <p className="text-sm text-cream/60 leading-relaxed mb-4">
              We partner directly with over 200 artisan families across 15 Indian states. From the
              Banarasi weavers of Varanasi to the block printers of Jaipur, every Sutra piece carries
              the DNA of centuries-old techniques.
            </p>
            <p className="text-sm text-cream/60 leading-relaxed mb-4">
              Our artisan-first model ensures fair wages, creative freedom, and the preservation of
              endangered crafts. When you buy from Sutra, you're not just purchasing a garment —
              you're sustaining a legacy.
            </p>
            <div className="grid grid-cols-3 gap-6 mt-8">
              {[
                { value: '200+', label: 'Artisan Families' },
                { value: '15', label: 'Indian States' },
                { value: '12', label: 'Craft Forms' },
              ].map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="font-serif text-2xl text-cream">{stat.value}</div>
                  <div className="text-[10px] tracking-wider uppercase text-cream/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="container-luxury py-20 lg:py-28">
      <div className="text-center mb-14">
        <span className="subheading">What We Stand For</span>
        <h2 className="heading-editorial text-3xl mt-3">Our Values</h2>
        <div className="divider-gold mt-4" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        {[
          {
            title: 'Authenticity',
            description: 'Every piece is handcrafted using traditional techniques. No shortcuts, no mass production. Just genuine artistry passed down through generations.',
          },
          {
            title: 'Connection',
            description: 'We bridge the distance between the diaspora and their roots. Every garment is a thread connecting you to the rich tapestry of Indian culture.',
          },
          {
            title: 'Sustainability',
            description: 'Handcraft is inherently sustainable. We support slow fashion, fair wages, and the preservation of endangered textile arts.',
          },
        ].map(value => (
          <div key={value.title} className="text-center">
            <h3 className="font-serif text-xl text-foreground mb-3">{value.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-cream-dark py-20 text-center">
      <div className="container-luxury">
        <h2 className="font-serif text-3xl text-foreground mb-4">Begin Your Sutra Journey</h2>
        <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
          Discover handcrafted pieces that carry the soul of India.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link to="/category/women" className="btn-brand">Shop Women</Link>
          <Link to="/category/men" className="btn-brand-outline">Shop Men</Link>
        </div>
      </div>
    </section>
  </div>
);

export default StoryPage;
