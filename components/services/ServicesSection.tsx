import ServiceCard from "./ServiceCard";

interface Props {
  category: string;
  description: string;
  items: { title: string; href: string }[];
}

export default function ServicesSection({
  category,
  description,
  items,
}: Props) {
  return (
    <section className="space-y-16">
      {/* Category Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
          {category}
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
          {description}
        </p>
      </div>

      {/* Service Cards */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <ServiceCard
            key={item.title}
            title={item.title}
            href={item.href}
          />
        ))}
      </div>
    </section>
  );
}
