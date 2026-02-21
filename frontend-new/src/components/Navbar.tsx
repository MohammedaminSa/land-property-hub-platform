import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
              <Home className="w-5 h-5 text-secondary-foreground" />
            </div>
            <span className="font-display text-xl font-bold text-primary-foreground">
              NestFind
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {["Buy", "Rent", "Sell", "About"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="font-body text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10">
              Sign In
            </Button>
            <Button variant="hero" className="rounded-full px-6">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-primary-foreground"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md rounded-2xl p-6 mb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {["Buy", "Rent", "Sell", "About"].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="font-body text-foreground hover:text-secondary transition-colors"
                >
                  {link}
                </a>
              ))}
              <hr className="border-border" />
              <Button variant="hero" className="rounded-full w-full">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
