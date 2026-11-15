import migrated from "./migrated.json";
// Add company-approved profile URLs here; never infer social handles.
export const socialLinks = { instagram: "", facebook: "" };
export const company = {
  name: "Sairaj LLP",
  phone: "+91 9922469898",
  tel: "+919922469898",
  whatsapp: "919922469898",
  email: "sairajgroups9898@yahoo.com",
  address: "F5QH+Q88, Sahajpurwadi, Maharashtra 412202",
  hours: "09:00 am to 10:00 pm",
};
const serviceDefinitions: [string, string, string, string, string, string][] = [
  [
    "warehouse-rental",
    "Warehouse Rental Services",
    "warehouse-rental-services",
    "Space that works for your business.",
    "Flexible, secure storage with short-term and long-term rental options.",
    "/images/warehouse.png",
  ],
  [
    "mathadi-services",
    "Loading & Unloading with Mathadi Services",
    "loading-unloading-with-mathadi-services",
    "Every load, handled with care.",
    "Trained Mathadi workers for safe loading, unloading and organised material handling.",
    "/images/mathadi.png",
  ],
  [
    "manpower-solutions",
    "Manpower Solutions",
    "admin-staff-skills-semiskilled-unskilled-manpower-providing-services",
    "The right people. The right support.",
    "Administrative, skilled, semi-skilled and unskilled staffing for your operations.",
    "/images/manpower.png",
  ],
  [
    "housekeeping",
    "Housekeeping Services",
    "housekeeping-services-with-material",
    "A better environment to work in.",
    "Professional cleaning and housekeeping with materials for well-maintained premises.",
    "/images/housekeeping.jpg",
  ],
  [
    "vehicle-forklift-rental",
    "Bus, Car & Forklift Rental",
    "bus-carforklift-rental-services",
    "Keep people and materials moving.",
    "Flexible vehicle and forklift rental for employee transport and material handling.",
    "/images/rental.jpg",
  ],
  [
    "goods-transportation",
    "All India Goods Transportation",
    "all-over-india-goods-courier-part-load-transportation-services",
    "Connecting your business across India.",
    "Goods, courier and part-load transportation for consignments large and small.",
    "/images/transport.jpg",
  ],
  [
    "corrugated-boxes",
    "Corrugated Box Supply",
    "corrugated-box-supply-services",
    "Protection for every journey.",
    "Durable shipping, storage and custom corrugated packaging solutions.",
    "/images/boxes.jpg",
  ],
  [
    "scrap-services",
    "Scrap Services",
    "scrap-services",
    "Responsible handling. Renewed possibilities.",
    "Scrap collection, sorting, recycling and disposal for industrial and commercial spaces.",
    "/images/scrap.jpg",
  ],
  [
    "canteen-food",
    "Canteen, Tea & Food Services",
    "canteen-tea-food-services",
    "Good food for a productive day.",
    "Freshly prepared meals, tea and snacks for businesses, institutions and events.",
    "/images/canteen.jpg",
  ],
  [
    "pest-control",
    "Pest Control Services",
    "pest-control-with-rodent-box-services",
    "Protecting your people and premises.",
    "Site-specific pest management, including rodent boxes and ongoing monitoring.",
    "/images/pest.jpg",
  ],
];
export const services = serviceDefinitions.map(
  ([slug, title, sourceSlug, headline, description, image]) => ({
    ...migrated.services.find((s) => s.sourceSlug === sourceSlug),
    slug,
    title,
    sourceSlug,
    headline,
    description,
    image,
  }),
);
export const posts = migrated.posts;
export const testimonials = [
  {
    name: "Suresh Katke",
    quote:
      "Sairaj LLP consistently delivers high-quality services with professionalism and reliability. They are a trusted partner for all our industrial needs.",
  },
  {
    name: "Jayant Patole",
    quote:
      "Their diverse service offerings and prompt support have streamlined our operations. We highly recommend Sairaj LLP for any business.",
  },
  {
    name: "Nayan Yagnik",
    quote:
      "From manpower to logistics, Sairaj LLP provides exceptional solutions tailored to our requirements. Truly dependable and efficient!",
  },
];
export const industries = [
  ["Manufacturing", "Workforce, warehousing and operational support.", "/images/manpower.png"],
  ["Food & Beverages", "Storage, handling, hygiene and workplace services.", "/images/canteen.jpg"],
  [
    "Auto Engineering",
    "Material handling and industrial staffing solutions.",
    "/images/rental.jpg",
  ],
  ["Retail & E-commerce", "Packaging, distribution and inventory support.", "/images/boxes.jpg"],
];
export function pageHead(title: string, description: string, path: string) {
  return {
    meta: [
      { title: `${title} | Sairaj LLP` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | Sairaj LLP` },
      { property: "og:description", content: description },
      { property: "og:url", content: `https://sairajgroups.in${path}` },
      { property: "og:image", content: "https://sairajgroups.in/images/hero.jpg" },
    ],
    links: [{ rel: "canonical", href: `https://sairajgroups.in${path}` }],
  };
}
