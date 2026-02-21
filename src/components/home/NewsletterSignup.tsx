import { useState } from 'react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="bg-cream-dark">
      <div className="container-luxury py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <span className="subheading">Stay Connected</span>
          <h2 className="heading-editorial text-3xl lg:text-4xl mt-3 mb-4">
            Join the Sutra Family
          </h2>
          <p className="text-sm text-muted-foreground mb-8 max-w-md mx-auto">
            Be the first to know about new collections, artisan stories, exclusive
            offers, and festival edits — curated for the Indian diaspora.
          </p>

          {submitted ? (
            <div className="py-4">
              <p className="font-serif text-lg text-primary">Welcome to the Sutra family ✦</p>
              <p className="text-sm text-muted-foreground mt-1">We'll be in touch soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-0 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 text-sm bg-card border border-border border-r-0 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-colors"
              />
              <button type="submit" className="btn-brand px-6 whitespace-nowrap">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
