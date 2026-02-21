import { MapPin, Bed, Bath, Maximize } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  type: "sale" | "rent";
}

const PropertyCard = ({ image, title, location, price, beds, baths, sqft, type }: PropertyCardProps) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)] transition-all duration-500 cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <Badge
          className={`absolute top-4 left-4 font-body text-xs font-semibold px-3 py-1 rounded-full ${
            type === "sale"
              ? "bg-secondary text-secondary-foreground"
              : "bg-primary text-primary-foreground"
          }`}
        >
          For {type === "sale" ? "Sale" : "Rent"}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display text-lg font-semibold text-card-foreground group-hover:text-secondary transition-colors">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-4">
          <MapPin className="w-4 h-4 text-muted-foreground" />
          <span className="font-body text-sm text-muted-foreground">{location}</span>
        </div>

        <div className="flex items-center gap-4 pb-4 mb-4 border-b border-border">
          <div className="flex items-center gap-1.5">
            <Bed className="w-4 h-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">{beds} Beds</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bath className="w-4 h-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">{baths} Baths</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-muted-foreground" />
            <span className="font-body text-sm text-muted-foreground">{sqft} sqft</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="font-display text-xl font-bold text-secondary">{price}</p>
          <span className="font-body text-xs text-muted-foreground">
            {type === "rent" ? "/month" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
