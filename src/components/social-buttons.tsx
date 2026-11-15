import { company, socialLinks } from "../data/company";

type Brand = "whatsapp" | "instagram" | "facebook";
export function BrandIcon({ brand, size = 20 }: { brand: Brand; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="brand-icon"
      style={{
        width: size,
        height: size,
        maskImage: `url(/images/${brand}.svg)`,
        WebkitMaskImage: `url(/images/${brand}.svg)`,
      }}
    />
  );
}

export function FloatingSocialButtons() {
  const items: [Brand, string, string][] = [
    ["instagram", "Instagram", socialLinks.instagram],
    ["facebook", "Facebook", socialLinks.facebook],
    ["whatsapp", "WhatsApp", `https://wa.me/${company.whatsapp}`],
  ];
  return (
    <aside className="floating-socials" aria-label="Connect with Sairaj LLP">
      {items.map(([brand, label, href]) =>
        href ? (
          <a
            className={`social-float social-${brand}`}
            href={href}
            key={brand}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label === "WhatsApp" ? "Chat with Sairaj LLP on WhatsApp" : `Sairaj LLP on ${label}`} (opens in a new tab)`}
          >
            <span className="social-tooltip">
              {label === "WhatsApp" ? "Chat on WhatsApp" : label}
            </span>
            <BrandIcon brand={brand} size={brand === "whatsapp" ? 27 : 23} />
          </a>
        ) : (
          <span
            className={`social-float social-${brand} social-unavailable`}
            key={brand}
            role="img"
            aria-label={`${label} — profile link unavailable`}
            title={`${label} — official profile link unavailable`}
          >
            <span className="social-tooltip">{label} link unavailable</span>
            <BrandIcon brand={brand} size={23} />
          </span>
        ),
      )}
    </aside>
  );
}
