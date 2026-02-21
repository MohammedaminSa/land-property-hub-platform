import PropertyCard from './PropertyCard';

const SimilarProperties = ({ properties, currentPropertyId }) => {
  // Filter out current property and limit to 3
  const similarProps = properties
    .filter(p => p.id !== currentPropertyId)
    .slice(0, 3);

  if (similarProps.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-2">
            Similar Properties
          </h2>
          <p className="font-body text-gray-600">
            You might also be interested in these properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {similarProps.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              image={property.image}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              baths={property.baths}
              sqft={property.sqft}
              type={property.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimilarProperties;
