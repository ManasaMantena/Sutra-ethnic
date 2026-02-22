import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <div className="w-full bg-white">
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center py-24 px-6">
        <h2 className="heading-editorial font-serif text-4xl lg:text-5xl text-foreground">Home Collection</h2>

        <div className="w-20 h-[2px] bg-[#9e7022] mt-6 mb-6 rounded-sm opacity-90" />

        <p className="text-lg text-muted-foreground max-w-2xl">Curated heritage home accents are arriving soon.</p>

        <p className="mt-6 text-sm text-foreground max-w-3xl leading-relaxed">
          Our handcrafted home collection is currently in preparation.
          <br />
          Stay tuned for a refined selection of cultural decor and artisan pieces.
        </p>

        <Link
          to="/category/jewellery"
          className="mt-8 inline-block px-5 py-3 border border-[#9e7022] text-[#6f4d1e] hover:bg-[#9e7022]/10 transition-colors text-sm font-medium tracking-wider uppercase"
        >
          Explore Jewellery
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
