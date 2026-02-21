import PropertyCard from "./PropertyCard";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

const properties = [
  {
    image: property1,
    title: "Modern City Apartment",
    location: "Downtown, New York",
    price: "$2,400",
    beds: 2,
    baths: 1,
    sqft: "1,100",
    type: "rent" as const,
  },
  {
    image: property2,
    title: "Charming Family Home",
    location: "Oakwood, Chicago",
    price: "$485,000",
    beds: 4,
    baths: 3,
    sqft: "2,800",
    type: "sale" as const,
  },
  {
    image: property3,
    title: "Luxury Condo Tower",
    location: "Midtown, Manhattan",
    price: "$1,250,000",
    beds: 3,
    baths: 2,
    sqft: "1,950",
    type: "sale" as const,
  },
  {
    image: property4,
    title: "Cozy Brick Townhouse",
    location: "Camden, London",
    price: "$1,800",
    beds: 3,
    baths: 2,
    sqft: "1,600",
    type: "rent" as const,
  },
  {
    image: property5,
    title: "Skyline Penthouse",
    location: "Upper East, New York",
    price: "$3,200,000",
    beds: 4,
    baths: 3,
    sqft: "3,500",
    type: "sale" as const,
  },
  {
    image: property6,
    title: "Mediterranean Villa",
    location: "Malibu, California",
    price: "$2,800,000",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    type: "sale" as const,
  },
];

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <p className="font-body text-secondary text-sm tracking-[0.2em] uppercase mb-3">
            Curated For You
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Hand-picked listings from our trusted sellers and landlords
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.title} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
