import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
          Ready to Find Your <span className="text-secondary">Perfect Place</span>?
        </h2>
        <p className="font-body text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-10">
          Whether you're looking to buy, rent, sell, or lease — join thousands of users who trust our marketplace for their real estate needs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="lg" className="rounded-full px-10 text-base">
            Browse Properties
          </Button>
          <Button variant="heroOutline" size="lg" className="rounded-full px-10 text-base">
            List Your Property
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
