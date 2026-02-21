import { Home } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                <Home className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="font-display text-xl font-bold text-background">NestFind</span>
            </div>
            <p className="font-body text-sm text-background/50 leading-relaxed">
              Your trusted real estate marketplace connecting buyers, sellers, tenants, and landlords.
            </p>
          </div>

          {/* Links */}
          {[
            {
              title: "For Buyers",
              links: ["Search Properties", "Featured Listings", "Price Guide", "Mortgage Calculator"],
            },
            {
              title: "For Sellers",
              links: ["List Property", "Pricing Plans", "Seller Guide", "Market Insights"],
            },
            {
              title: "Company",
              links: ["About Us", "Contact", "Careers", "Privacy Policy"],
            },
          ].map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold text-background mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="font-body text-sm text-background/40 hover:text-secondary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-background/10 text-center">
          <p className="font-body text-sm text-background/30">
            © 2026 NestFind. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
