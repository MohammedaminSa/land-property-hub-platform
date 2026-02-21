import React from 'react';
import { Search, Upload, Handshake, ShieldCheck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Properties',
    description: 'Browse thousands of listings with advanced filters for location, price, and type.',
  },
  {
    icon: Upload,
    title: 'List Your Property',
    description: 'Sellers and landlords can easily upload property details and reach thousands of buyers.',
  },
  {
    icon: Handshake,
    title: 'Connect & Deal',
    description: 'Get in touch directly with property owners or interested buyers to close the deal.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Transactions',
    description: 'Every listing is verified and transactions are managed with full transparency.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Simple Process
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative text-center group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gray-300" />
                )}

                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                </div>

                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="font-body text-sm text-gray-600 max-w-[250px] mx-auto">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
